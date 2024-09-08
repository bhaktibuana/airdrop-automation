import { Response } from 'express';

import { Service } from '@/libs';
import { TomarketApi } from '@/app/apis';
import {
	AccountInfoQueryDTO,
	FarmingLogsQueryDTO,
} from '@/app/controllers/dto/tomarket.dto';
import { SettingRepository, TomarketRepository } from '@/app/repositories';
import { I_Account } from '@/app/models/interfaces/account.interface';
import { AppUtil } from '@/shared/utils';
import { SettingService } from '@/app/services/setting.service';
import { Constant } from '@/shared/constants';

export class TomarketService extends Service {
	protected tomarketApi: TomarketApi;
	protected settingRepo: SettingRepository;
	protected tomarketRepo: TomarketRepository;
	protected settingSvc: SettingService;

	constructor() {
		super();

		this.tomarketApi = new TomarketApi();
		this.settingRepo = new SettingRepository();
		this.tomarketRepo = new TomarketRepository();
		this.settingSvc = new SettingService();
	}

	public async accountInfo(res: Response, payload: AccountInfoQueryDTO) {
		try {
			return await this.accountDetail(payload.username);
		} catch (error) {
			await this.systemLog(this.accountInfo.name, error);
			this.errorResponse(res, error);
		}

		return null;
	}

	public async farming(username: string) {
		try {
			const account = await this.settingRepo.findOne({
				username,
				active: true,
			});
			if (!account) this.errorHandler(404, 'Username not found');
			if (account?.type !== 'telegram')
				this.errorHandler(400, 'Not telegram account');

			const loginResult = await this.login(account?.token);
			if (Object.keys(loginResult?.data as object).length <= 0)
				this.errorHandler(400, 'Invalid Tomarket account');

			// get current account info
			const accountInfoBefore = await this.accountDetail(username);

			const accessToken = loginResult?.data.access_token as string;

			const balance = await this.balance(accessToken);
			const gameId = balance?.data.farming.game_id as string;

			// claim farm points
			await this.farmClaim(accessToken, gameId);
			await this.farmStart(accessToken, gameId);

			// claim hidden points
			const hiddenStatus = await this.hiddenStatus(accessToken);
			const taskId =
				hiddenStatus?.data !== undefined
					? hiddenStatus.data.length > 0
						? (hiddenStatus?.data[0].taskId as number)
						: undefined
					: undefined;
			if (taskId) {
				await this.hiddenClaim(accessToken, taskId);
			}

			// claim game points till tickets == 0
			let tickets = balance?.data ? balance.data.play_passes : 0;
			while (tickets > 0) {
				await this.gameStart(accessToken, gameId);
				await AppUtil.sleep(38 * 1000);
				await this.gameClaim(accessToken, gameId);
				await AppUtil.sleep(2 * 1000);
				await this.gameShare(accessToken, gameId);

				const newBalance = await this.balance(accessToken);
				tickets = newBalance?.data ? newBalance.data.play_passes : 0;
			}

			// upgrade rank if possible
			const rank = await this.rank(accessToken);
			const availableStars = rank?.data ? rank.data.unusedStars : 0;
			if (availableStars > 0) {
				await this.upgradeRank(accessToken, availableStars);
			}

			// get account info after process
			const accountInfoAfter = await this.accountDetail(username);

			// log account info
			const logPayload = {
				username,
				account_before: accountInfoBefore,
				account_after: accountInfoAfter,
			};
			await this.systemLog(
				this.farming.name,
				logPayload,
				'success',
				Constant.TOMARKET,
			);
		} catch (error) {
			await this.systemLog(this.farming.name, error);
		}

		return true;
	}

	public async farmingLogs(res: Response, payload: FarmingLogsQueryDTO) {
		try {
			return await this.tomarketRepo.getSystemLogs(
				payload.username,
				payload.status,
				{
					current_page: payload.page,
					per_page: payload.per_page,
				},
			);
		} catch (error) {
			await this.systemLog(this.farmingLogs.name, error);
			this.errorResponse(res, error);
		}

		return {
			data: [],
			pagination: {},
		};
	}

	public async updateActive(
		res: Response,
		username: string,
		active: boolean,
	): Promise<I_Account | null> {
		try {
			const isUsernameExist =
				await this.settingSvc.checkUsername(username);
			if (!isUsernameExist) {
				this.errorHandler(404, 'Username is not exist');
			}

			if (active) {
				return await this.settingRepo.addActiveAirdrops(
					{ username: username },
					[Constant.TOMARKET],
				);
			} else {
				return await this.settingRepo.removeActiveAirdrops(
					{ username: username },
					[Constant.TOMARKET],
				);
			}
		} catch (error) {
			await this.systemLog(this.updateActive.name, error);
			this.errorResponse(res, error);
		}

		return null;
	}

	public async getActiveUsername() {
		try {
			const accounts = await this.settingRepo.findByActiveAirdrops([
				Constant.TOMARKET,
			]);

			if (accounts.length > 0) {
				return accounts.map((item) => item.username);
			} else {
				return [];
			}
		} catch (error) {
			await this.systemLog(this.getActiveUsername.name, error);
		}

		return [];
	}

	private async accountDetail(username: string) {
		try {
			const telegramAccount = await this.settingRepo.findOne({
				username,
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
			await this.systemLog(this.accountDetail.name, error);
		}

		return null;
	}

	private async login(token: I_Account['token']) {
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

	private async balance(accessToken: string) {
		try {
			return await this.tomarketApi.balance(accessToken);
		} catch (error) {
			await this.systemLog(this.balance.name, error);
			this.errorHandler(400, 'Failed get Tomarket balance');
		}
	}

	private async rank(accessToken: string) {
		try {
			return await this.tomarketApi.rank(accessToken);
		} catch (error) {
			await this.systemLog(this.rank.name, error);
			this.errorHandler(400, 'Failed get Tomarket rank');
		}
	}

	private async farmClaim(accessToken: string, gameId: string) {
		try {
			return await this.tomarketApi.farmClaim(accessToken, gameId);
		} catch (error) {
			await this.systemLog(this.farmClaim.name, error);
			this.errorHandler(400, 'Failed farm claim Tomarket');
		}
	}

	private async farmStart(accessToken: string, gameId: string) {
		try {
			return await this.tomarketApi.farmStart(accessToken, gameId);
		} catch (error) {
			await this.systemLog(this.farmStart.name, error);
			this.errorHandler(400, 'Failed farm start Tomarket');
		}
	}

	private async hiddenStatus(accessToken: string) {
		try {
			return await this.tomarketApi.hiddenStatus(accessToken);
		} catch (error) {
			await this.systemLog(this.hiddenStatus.name, error);
			this.errorHandler(400, 'Failed hidden status Tomarket');
		}
	}

	private async hiddenClaim(accessToken: string, taskId: number) {
		try {
			return await this.tomarketApi.hiddenClaim(accessToken, taskId);
		} catch (error) {
			await this.systemLog(this.hiddenClaim.name, error);
			this.errorHandler(400, 'Failed hidden claim Tomarket');
		}
	}

	private async gameStart(accessToken: string, gameId: string) {
		try {
			return await this.tomarketApi.gameStart(accessToken, gameId);
		} catch (error) {
			await this.systemLog(this.gameStart.name, error);
			this.errorHandler(400, 'Failed game start Tomarket');
		}
	}

	private async gameClaim(accessToken: string, gameId: string) {
		try {
			return await this.tomarketApi.gameClaim(accessToken, gameId);
		} catch (error) {
			await this.systemLog(this.gameClaim.name, error);
			this.errorHandler(400, 'Failed game claim Tomarket');
		}
	}

	private async gameShare(accessToken: string, gameId: string) {
		try {
			return await this.tomarketApi.gameShare(accessToken, gameId);
		} catch (error) {
			await this.systemLog(this.gameShare.name, error);
			this.errorHandler(400, 'Failed game share Tomarket');
		}
	}

	private async upgradeRank(accessToken: string, stars: number) {
		try {
			return await this.tomarketApi.upgradeRank(accessToken, stars);
		} catch (error) {
			await this.systemLog(this.upgradeRank.name, error);
			this.errorHandler(400, 'Failed upgrade rank Tomarket');
		}
	}
}
