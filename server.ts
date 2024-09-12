// @ts-nocheck
import { join } from 'path';
import { env } from 'bun';
import express, { json, urlencoded } from 'express';
import chalk from 'chalk';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import errorhandler from 'errorhandler';
import helmet from 'helmet';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';

import { indexRouter } from './routes/index.ts';

const BASE_DIR = join(import.meta.dir, 'public');
const PORT = env.PORT ?? 3000;

const debugLogger = debug('minexlauncher:server');
const isDev = env.NODE_ENV === 'development';

const app = express();
app.enable('strict routing');

debugLogger('Booting server.');

app.use(
	helmet({
		contentSecurityPolicy: false,
	}),
);

app.use(morgan(isDev ? 'dev' : 'combined'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cookieParser());

app.use(compression());

if (isDev) app.use(errorhandler());

app.use(
	serveFavicon(join(BASE_DIR, 'resources/images/icons/favicon.webp'), {
		maxAge: 86400,
	}),
);
app.use(serveStatic(BASE_DIR));

app.use('/', indexRouter);

app.use(async (req, res, next) => {
	res.status(404).sendFile(join(BASE_DIR, '404.html'));
	next();
});

app.use(async (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('500 Internal Server Error');
	next();
});
// push for the update dev
app
	.listen(PORT, async () => {
		debugLogger('Server started.');
		console.log(chalk.green(`Server is running on port ${PORT}`));
	})
	.on('error', (error) => {
		if (error.code === 'EADDRINUSE') {
			console.error(
				chalk.red('EADDRINUSE') +
					chalk.gray(': ') +
					chalk.bold(`Failed to start server. Is port ${PORT} in use?`),
			);
			process.exit(1);
		}
	});
