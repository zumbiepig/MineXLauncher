import express from 'express';
import morgan from 'morgan';
import httpProxy from 'http-proxy';

const PORT = process.env['PORT'] ?? 3000;

const proxy = httpProxy.createProxyServer({
	target: 'https://launcher.orionzleon.me',
	ws: true,
	xfwd: true,
	secure: true,
	changeOrigin: true,
});

const app = express();

app.use(morgan('combined'));

app.use((req, res) => proxy.web(req, res));

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}/`),
);
