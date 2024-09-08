import { RootQuerySelector } from 'mongoose';

import { Account } from '@/app/models';
import {
	I_Account,
	I_AccountBase,
} from '@/app/models/interfaces/account.interface';
import { T_AccountType } from '@/shared/types';

export class SettingRepository {
	public async findOne(query: RootQuerySelector<I_Account>) {
		const account = new Account();
		return await account.findOne(query);
	}

	public async create(payload: I_AccountBase) {
		const account = new Account();
		account.payload = payload;
		return await account.save();
	}

	public async findAccountsToken(accountType: T_AccountType) {
		const account = new Account();
		return await account.getRaw([
			{
				$match: {
					type: accountType,
					active: true,
				},
			},
			{
				$project: {
					_id: 0,
					token: 1,
				},
			},
		]);
	}

	public async update(
		query: RootQuerySelector<I_Account>,
		payload: Partial<I_Account>,
	) {
		const account = new Account();
		return await account.findOneAndUpdate(query, payload);
	}

	public async addActiveAirdrops(
		query: RootQuerySelector<I_Account>,
		airdropName: string[],
	) {
		const account = new Account();
		const data = await account.findOne(query);
		if (!data) return null;

		const activeAirdrops = data.active_airdrops ? data.active_airdrops : [];
		const payload = [...activeAirdrops, ...airdropName];
		return await account.findOneAndUpdate(query, {
			active_airdrops: payload,
		});
	}

	public async removeActiveAirdrops(
		query: RootQuerySelector<I_Account>,
		airdropNames: string[],
	) {
		const account = new Account();
		const data = await account.findOne(query);
		if (!data) return null;

		const activeAirdrops = data.active_airdrops ? data.active_airdrops : [];
		if (activeAirdrops.length <= 0) return data;

		const payload = activeAirdrops.filter(
			(item) => !airdropNames.includes(item),
		);
		return await account.findOneAndUpdate(query, {
			active_airdrops: payload,
		});
	}

	public async resetActiveAirdrops(query: RootQuerySelector<I_Account>) {
		const account = new Account();
		return await account.findOneAndUpdate(query, {
			active_airdrops: [],
		});
	}
}
