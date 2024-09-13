import { type IncomingHttpHeaders } from 'http';
import https from 'https';
import express from 'express';
import morgan from 'morgan';

const PROXY_HOSTNAME = 'launcher.orionzleon.me';
const CACHE_LIFETIME = 1000 * 60 * 10; // 10 minutes
const MAX_CACHE_SIZE = 1024 * 1024 * 1024 * 0.5; // 0.5 GiB

const PORT = process.env['PORT'] ?? 3000;

const cache = new Map<
	string,
	{
		lastFetched: number;
		statusCode: number;
		headers: IncomingHttpHeaders;
		data: Buffer;
	}
>();
let cacheSize = 0;
const requestCounter = new Map<string, number>();

const app = express();

app.use(morgan(':method :url :status - :response-time ms'));

app.use((req, res) => {
	if (req.method === 'GET' && cache.has(req.url)) {
		const cached = cache.get(req.url);
		if (cached && Date.now() - cached.lastFetched < CACHE_LIFETIME) {
			requestCounter.set(req.url, (requestCounter.get(req.url) ?? 0) + 1);
			res.writeHead(cached.statusCode, cached.headers).end(cached.data);
			return;
		}
	}

	const proxyReq = https.request(
		{
			hostname: PROXY_HOSTNAME,
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
					if (cacheSize > MAX_CACHE_SIZE) {
						const keys = Array.from(cache.keys());
						keys.sort(
							(a, b) =>
								(requestCounter.get(a) ?? 0) - (requestCounter.get(b) ?? 0),
						);
						while (cacheSize > MAX_CACHE_SIZE && keys.length > 0) {
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

	proxyReq.on('error', () =>
		res
			.writeHead(500, { 'Content-Type': 'text/plain' })
			.end('500 Internal Server Error'),
	);

	proxyReq.end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}.\nYou can change the port with \`PORT=1234 ./path/to/executable\`.\n\nThis program may use up to 500 MB of RAM.`));
