import { join } from 'path';
import chalk from 'chalk';

import express, {
	json,
	urlencoded,
	type Request,
	type Response,
	type NextFunction,
} from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';

import { indexRouter } from './routes/index.ts';

const BASE_DIR = join(import.meta.dir, 'public');
const PORT = process.env['PORT'] ?? 3000;

const isDev = process.env.NODE_ENV === 'development';

const app = express();
app.enable('strict routing');

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
if (isDev) app.use((await import('errorhandler')).default());

app.use(
	serveFavicon(join(BASE_DIR, 'resources/images/icons/favicon.webp'), {
		maxAge: 86400,
	}),
);
app.use(serveStatic(BASE_DIR));

app.use('/', indexRouter);

app.use((_req: Request, res: Response, next: NextFunction) => {
	res.status(404).sendFile(join(BASE_DIR, '404.html'));
	next();
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('500 Internal Server Error');
	next();
});

app
	.listen(PORT, () =>
		console.log(chalk.green(`Server is running on port ${PORT}`)),
	)
	.on('error', (error: NodeJS.ErrnoException) => {
		if (error.code === 'EADDRINUSE') {
			console.error(
				chalk.red('EADDRINUSE') +
					chalk.gray(': ') +
					chalk.bold(`Failed to start server. Is port ${PORT} in use?`),
			);
			process.exit(1);
		}
	});
