import { Response } from 'express';

import { Service } from '@/libs';
import { CreateAccountBodyDTO } from '@/app/controllers/dto/setting.dto';
import { I_Account } from '@/app/models/interfaces/account.interface';
import { SettingRepository } from '@/app/repositories';

export class SettingService extends Service {
	protected settingRepo: SettingRepository;

	constructor() {
		super();

		this.settingRepo = new SettingRepository();
	}

	/**
	 * Create Account Service
	 *
	 * @param res
	 * @param payload
	 * @returns Promise<I_Account | undefined>
	 */
	public async createAccount(
		res: Response,
		payload: CreateAccountBodyDTO,
	): Promise<I_Account | null> {
		try {
			const isUsernameExist = await this.checkUsername(payload);
			if (isUsernameExist) {
				this.errorHandler(400, 'Username already exist');
			}

			return await this.settingRepo.create({
				type: payload.type,
				username: payload.username,
				token: payload.token,
			});
		} catch (error) {
			await this.systemLog(this.createAccount.name, error);
			this.errorResponse(res, error);
		}

		return null;
	}

	/**
	 * Check is username exist
	 *
	 * @param payload
	 * @returns Promise<boolean>
	 */
	private async checkUsername(
		payload: CreateAccountBodyDTO,
	): Promise<boolean> {
		const result = await this.settingRepo.findOne({
			username: payload.username,
		});
		return result ? true : false;
	}
}
