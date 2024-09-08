import { Response } from 'express';

import { Service } from '@/libs';
import { TomarketApi } from '@/app/apis';
import { AccountInfoQueryDTO } from '@/app/controllers/dto/tomarket.dto';
import { SettingRepository } from '@/app/repositories';
import { I_Account } from '@/app/models/interfaces/account.interface';

export class TomarketService extends Service {
	protected tomarketApi: TomarketApi;
	protected settingRepo: SettingRepository;

	constructor() {
		super();

		this.tomarketApi = new TomarketApi();
		this.settingRepo = new SettingRepository();
	}

	public async accountInfo(res: Response, payload: AccountInfoQueryDTO) {
		try {
			const telegramAccount = await this.settingRepo.findOne({
				username: payload.username,
			});

			if (!telegramAccount)
				this.errorHandler(404, 'Username does not exist');

			const loginResult = await this.login(telegramAccount?.token);
			const balanceResult = await this.balance(
				loginResult?.data.access_token as string,
			);
			const rankResult = await this.rank(
				loginResult?.data.access_token as string,
			);

			return {
				telegram_id: loginResult?.data.tel_id,
				user_id: loginResult?.data.id,
				first_name: loginResult?.data.fn,
				last_name: loginResult?.data.ln,
				available_balance: balanceResult?.data.available_balance,
				tickets: balanceResult?.data.play_passes,
				rank: {
					name: rankResult?.data.futureRankName,
					used_stars: rankResult?.data.usedStars,
					unused_stars: rankResult?.data.unusedStars,
				},
			};
		} catch (error) {
			await this.systemLog(this.accountInfo.name, error);
			this.errorResponse(res, error);
		}

		return null;
	}

	public async login(token: I_Account['token']) {
		try {
			return await this.tomarketApi.login({
				init_data: token as string,
				from: '',
				invite_code: '',
				is_bot: false,
			});
		} catch (error) {
			await this.systemLog(this.login.name, error);
			this.errorHandler(400, 'Failed login into Tomarket');
		}
	}

	public async balance(accessToken: string) {
		try {
			return await this.tomarketApi.balance(accessToken);
		} catch (error) {
			await this.systemLog(this.balance.name, error);
			this.errorHandler(400, 'Failed get Tomarket balance');
		}
	}

	public async rank(accessToken: string) {
		try {
			return await this.tomarketApi.rank(accessToken);
		} catch (error) {
			await this.systemLog(this.rank.name, error);
			this.errorHandler(400, 'Failed get Tomarket rank');
		}
	}
}
