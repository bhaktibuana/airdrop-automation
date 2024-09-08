import { Request, Response } from 'express';

import { Controller } from '@/libs';
import { CreateAccountBodyDTO } from '@/app/controllers/dto/setting.dto';
import { SettingService } from '@/app/services';

export class SettingController extends Controller {
	protected settingSvc: SettingService;

	constructor() {
		super();

		this.settingSvc = new SettingService();
	}

	/**
	 * Store Telegram Account
	 *
	 * @param req Request
	 * @param res Response
	 */
	public async createAccount(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				CreateAccountBodyDTO,
				req,
			);
			const result = await this.settingSvc.createAccount(res, reqBody);
			this.response(res, 'User data', this.STATUS_CODE.OK, result);
		} catch (error) {
			await this.systemLog(this.createAccount.name, error);
			this.errorResponse(res, error);
		} finally {
			return;
		}
	}
}
