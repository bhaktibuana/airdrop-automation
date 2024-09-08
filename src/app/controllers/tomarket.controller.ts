import { Request, Response } from 'express';

import { Controller } from '@/libs';
import { AccountInfoQueryDTO } from '@/app/controllers/dto/tomarket.dto';
import { TomarketService } from '@/app/services';

export class TomarketController extends Controller {
	protected tomarketSvc: TomarketService;

	constructor() {
		super();

		this.tomarketSvc = new TomarketService();
	}

	/**
	 * Get Account Info
	 *
	 * @param req
	 * @param res
	 */
	public async accountInfo(req: Request, res: Response): Promise<void> {
		try {
			const reqQuery = await this.getRequestQuery(
				AccountInfoQueryDTO,
				req,
			);
			const result = await this.tomarketSvc.accountInfo(res, reqQuery);
			this.response(
				res,
				'Tomarket account info',
				this.STATUS_CODE.OK,
				result,
			);
		} catch (error) {
			await this.systemLog(this.accountInfo.name, error);
			this.errorResponse(res, error);
		} finally {
			return;
		}
	}
}
