import { Response } from 'express';

import { Service } from '@/libs';
import { Account } from '@/app/models';
import { CreateAccountBodyDTO } from '@/app/controllers/dto/setting.dto';
import { I_Account } from '@/app/models/interfaces/account.interface';

export class SettingService extends Service {
	constructor() {
		super();
	}

	public async createAccount(
		res: Response,
		payload: CreateAccountBodyDTO,
	): Promise<I_Account | undefined> {
		let result;

		try {
			const isUsernameExist = await this.checkUsername(payload);
			if (isUsernameExist) {
				this.errorHandler(400, 'Username already exist');
			}

			const account = new Account();
			account.payload = {
				type: payload.type,
				username: payload.username,
				token: payload.token,
			};
			result = await account.save();
		} catch (error) {
			await this.systemLog(this.createAccount.name, error);
			this.errorResponse(res, error);
		}

		return result;
	}

	private async checkUsername(
		payload: CreateAccountBodyDTO,
	): Promise<boolean> {
		const account = new Account();
		const result = await account.findOne({ username: payload.username });
		return result ? true : false;
	}
}
