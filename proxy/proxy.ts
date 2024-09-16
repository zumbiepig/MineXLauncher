import { type IncomingHttpHeaders } from 'http';
import https from 'https';
import express from 'express';
import morgan from 'morgan';

if (Number(process.env['CACHE_MINUTES'] ?? 10) < 5)
	process.env['CACHE_MINUTES'] = '5';

const PORT = process.env['PORT'] ?? 3000;
const CACHE_MINUTES = process.env['CACHE_MINUTES'] ?? 10;
const CACHE_SIZE = process.env['CACHE_SIZE'] ?? 0.5;

const cache = new Map<
	string,
	{
		lastFetched: number;
		statusCode: number;
		headers: IncomingHttpHeaders;
		data: Buffer;
	}
>();
const maxCacheSize = 1024 * 1024 * 1024 * Number(CACHE_SIZE);
let cacheSize = 0;
const cacheLifetime = 1000 * 60 * Number(CACHE_MINUTES);
const proxyHostname = 'launcher.orionzleon.me';
const requestCounter = new Map<string, number>();

const app = express();

app.use(morgan(':method :url :status - :response-time ms'));

app.use((req, res) => {
	if (req.method === 'GET' && cache.has(req.url)) {
		const cached = cache.get(req.url);
		if (cached && Date.now() - cached.lastFetched < cacheLifetime) {
			requestCounter.set(req.url, (requestCounter.get(req.url) ?? 0) + 1);
			res.writeHead(cached.statusCode, cached.headers).end(cached.data);
		}
	} else {
		const proxyReq = https.request(
			{
				hostname: proxyHostname,
				path: req.url,
				method: req.method,
			},
			(proxyRes) => {
				const statusCode = proxyRes.statusCode ?? 500;
				const headers = proxyRes.headers;

				const responseChunks: Buffer[] = [];

				proxyRes.on('data', (chunk) => responseChunks.push(chunk));

				proxyRes.on('end', () => {
					const responseData = Buffer.concat(responseChunks);

					if (req.method === 'GET') {
						cache.set(req.url, {
							lastFetched: Date.now(),
							statusCode: statusCode,
							headers: headers,
							data: responseData,
						});

						requestCounter.set(req.url, (requestCounter.get(req.url) ?? 0) + 1);

						cacheSize += responseData.length;
						if (cacheSize > maxCacheSize) {
							const keys = Array.from(cache.keys());
							keys.sort(
								(a, b) =>
									(requestCounter.get(a) ?? 0) - (requestCounter.get(b) ?? 0),
							);
							while (cacheSize > maxCacheSize && keys.length > 0) {
								const key = keys.shift();
								if (key) {
									const cached = cache.get(key);
									if (cached) {
										cacheSize -= cached.data.length;
										cache.delete(key);
									}
								}
							}
						}
					}

					res.writeHead(statusCode, headers).end(responseData);
				});
			},
		);

		proxyReq.on('error', () => {
			if (req.method === 'GET' && cache.has(req.url)) {
				const cached = cache.get(req.url);
				if (cached) {
					requestCounter.set(req.url, (requestCounter.get(req.url) ?? 0) + 1);
					res.writeHead(cached.statusCode, cached.headers).end(cached.data);
				}
			} else
				res
					.writeHead(500, { 'Content-Type': 'text/plain' })
					.end('500 Internal Server Error');
		});

		proxyReq.end();
	}
});

app.listen(PORT, () =>
	console.log(
		`Server running on http://localhost:${PORT}/\n\nConfiguration:\n  Maximum memory usage: ${CACHE_SIZE} GiB\n  Cache TTL: ${CACHE_MINUTES} minutes`,
	),
);
