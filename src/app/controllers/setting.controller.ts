import { Request, Response } from 'express';

import { Controller } from '@/libs';
import {
	ActivateAccountBodyDTO,
	CreateAccountBodyDTO,
	DeactivateAccountBodyDTO,
} from '@/app/controllers/dto/setting.dto';
import { SettingService } from '@/app/services';

export class SettingController extends Controller {
	protected settingSvc: SettingService;

	constructor() {
		super();

		this.settingSvc = new SettingService();
	}

	/**
	 * Store Account
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
			this.response(
				res,
				'Create account success',
				this.STATUS_CODE.CREATED,
				result,
			);
		} catch (error) {
			await this.systemLog(this.createAccount.name, error);
			this.errorResponse(res, error);
		} finally {
			return;
		}
	}

	public async deactivateAccount(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				DeactivateAccountBodyDTO,
				req,
			);
			const result = await this.settingSvc.updateActive(
				res,
				reqBody.username,
				false,
			);
			this.response(
				res,
				'Deactivate account success',
				this.STATUS_CODE.OK,
				result,
			);
		} catch (error) {
			await this.systemLog(this.deactivateAccount.name, error);
			this.errorResponse(res, error);
		} finally {
			return;
		}
	}

	public async activateAccount(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				ActivateAccountBodyDTO,
				req,
			);
			const result = await this.settingSvc.updateActive(
				res,
				reqBody.username,
				true,
			);
			this.response(
				res,
				'Activate account success',
				this.STATUS_CODE.OK,
				result,
			);
		} catch (error) {
			await this.systemLog(this.activateAccount.name, error);
			this.errorResponse(res, error);
		} finally {
			return;
		}
	}
}
