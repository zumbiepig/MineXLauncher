import {
	Router,
	type Request,
	type Response,
	type NextFunction,
} from 'express';

const router = Router();

router.get('/', (_req: Request, _res: Response, next: NextFunction) => {
	next();
});

export default router;
