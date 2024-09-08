import { Request, Response } from 'express';

import { Controller } from '@/libs';
import {
	AccountInfoQueryDTO,
	ActivateAccountBodyDTO,
	DeactivateAccountBodyDTO,
	FarmingLogsQueryDTO,
} from '@/app/controllers/dto/tomarket.dto';
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

	public async farmingLogs(req: Request, res: Response): Promise<void> {
		try {
			const reqQuery = await this.getRequestQuery(
				FarmingLogsQueryDTO,
				req,
			);
			const { data, pagination } = await this.tomarketSvc.farmingLogs(
				res,
				reqQuery,
			);
			this.responsePagination(
				res,
				'Tomarket farming logs',
				this.STATUS_CODE.OK,
				data,
				pagination,
			);
		} catch (error) {
			await this.systemLog(this.farmingLogs.name, error);
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
			const result = await this.tomarketSvc.updateActive(
				res,
				reqBody.username,
				true,
			);
			this.response(
				res,
				'Tomarket activated on this account',
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

	public async deactivateAccount(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				DeactivateAccountBodyDTO,
				req,
			);
			const result = await this.tomarketSvc.updateActive(
				res,
				reqBody.username,
				false,
			);
			this.response(
				res,
				'Tomarket deactivated on this account',
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

	public async getActiveUsername(
		_req: Request,
		res: Response,
	): Promise<void> {
		try {
			const result = await this.tomarketSvc.getActiveUsername();
			this.response(res, 'Active username', this.STATUS_CODE.OK, result);
		} catch (error) {
			await this.systemLog(this.getActiveUsername.name, error);
			this.errorResponse(res, error);
		} finally {
			return;
		}
	}
}
