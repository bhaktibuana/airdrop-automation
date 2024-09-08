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
}
