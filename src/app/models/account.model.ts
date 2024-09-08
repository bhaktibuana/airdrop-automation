import mongoose, { Model } from 'mongoose';

import { ModelLibrary } from '@/libs';
import { AccountSchema } from '@/app/models/schemas/account.schema';
import {
	I_Account,
	I_AccountBase,
} from '@/app/models/interfaces/account.interface';

export class Account extends ModelLibrary<I_Account> {
	public payload: I_AccountBase = {} as I_AccountBase;

	constructor() {
		super(
			mongoose.models.account ||
				(mongoose.model<I_Account>(
					'account',
					AccountSchema.getSchema(),
				) as Model<I_Account>),
		);
	}

	public async save(): Promise<I_Account> {
		return await this.saveInstance(this.payload);
	}
}
