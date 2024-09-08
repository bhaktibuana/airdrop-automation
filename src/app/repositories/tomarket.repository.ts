import { RootQuerySelector } from 'mongoose';

import { Account } from '@/app/models';
import {
	I_Account,
	I_AccountBase,
} from '@/app/models/interfaces/account.interface';

export class TomarketRepository {
	public async findOne(query: RootQuerySelector<I_Account>) {
		const account = new Account();
		return await account.findOne(query);
	}

	public async create(payload: I_AccountBase) {
		const account = new Account();
		account.payload = payload;
		return await account.save();
	}
}
