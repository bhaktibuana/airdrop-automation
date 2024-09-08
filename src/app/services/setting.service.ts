import { Response } from 'express';

import { Service } from '@/libs';
import {
	CreateAccountBodyDTO,
	DeactivateAccountBodyDTO,
} from '@/app/controllers/dto/setting.dto';
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
			const isUsernameExist = await this.checkUsername(payload.username);
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

	public async updateActive(
		res: Response,
		username: string,
		active: boolean,
	): Promise<I_Account | null> {
		try {
			const isUsernameExist = await this.checkUsername(username);
			if (!isUsernameExist) {
				this.errorHandler(404, 'Username is not exist');
			}

			return await this.settingRepo.update(
				{ username: username },
				{ active },
			);
		} catch (error) {
			await this.systemLog(this.updateActive.name, error);
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
	private async checkUsername(username: string): Promise<boolean> {
		const result = await this.settingRepo.findOne({
			username: username,
		});
		return result ? true : false;
	}
}
