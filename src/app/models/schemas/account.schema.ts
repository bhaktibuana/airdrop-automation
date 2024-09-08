import { Schema } from 'mongoose';
import dayjs from 'dayjs';

import { I_AccountBase } from '@/app/models/interfaces/account.interface';

export class AccountSchema {
	public static getSchema() {
		return new Schema<I_AccountBase>({
			type: {
				type: String,
				required: true,
			},
			username: {
				type: String,
				unique: true,
				required: true,
			},
			token: {
				type: String,
				required: true,
			},
			active: {
				type: Boolean,
				default: true,
				required: true,
			},
			created_at: {
				type: Date,
				required: true,
				default: dayjs().toDate(),
			},
			updated_at: {
				type: Date,
				required: true,
				default: dayjs().toDate(),
			},
			deleted_at: {
				type: Date,
				default: null,
			},
		});
	}
}
