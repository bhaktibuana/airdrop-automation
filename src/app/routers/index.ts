import { NextFunction, Request, Response, Router } from 'express';

import { AppRouter } from '@/app/routers/app.router';
import { Constant } from '@/shared/constants';
import { HTTP } from '@/shared/utils';
import { AppConfig } from '@/configs';

class Routers {
	public readonly router = Router();
	private readonly appRouter = Router();

	constructor() {
		new AppRouter(this.appRouter);
		this.index();
	}

	/**
	 * Index Routers
	 */
	private index(): void {
		this.router.use(
			(req: Request, res: Response, next: NextFunction): void => {
				if (AppConfig.nodeEnv === 'production') {
					res.locals.baseUrl = AppConfig.baseUrl;
				} else {
					res.locals.baseUrl = `${req.protocol}://${req.headers.host}`;
				}
				next();
			},
		);

		this.router.use('/api', this.appRouter);
		this.router.use('/:anyRoute', (req: Request, res: Response): void => {
			const url = `${res.locals.baseUrl}${req.originalUrl}`;
			HTTP.response(res, `URL not found: ${url}`, 404);
		});
		this.router.use('/', (_req: Request, res: Response): void => {
			const url = res.locals.baseUrl;
			HTTP.response(res, Constant.APP_INDEX_MESSAGE, 200, { url });
		});
	}
}

export const routers = new Routers().router;
