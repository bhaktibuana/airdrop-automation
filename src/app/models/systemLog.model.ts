import mongoose, { Model } from 'mongoose';

import { ModelLibrary } from '@/libs';
import { SystemLogSchema } from '@/app/models/schemas/systemLog.schema';
import {
	I_SystemLog,
	I_SystemLogBase,
} from '@/app/models/interfaces/systemLog.interface';

export class SystemLog extends ModelLibrary<I_SystemLog> {
	public payload: I_SystemLogBase = {} as I_SystemLogBase;

	constructor() {
		super(
			mongoose.models.system_log ||
				(mongoose.model<I_SystemLog>(
					'system_log',
					SystemLogSchema.getSchema(),
				) as Model<I_SystemLog>),
		);
	}

	public async save(): Promise<I_SystemLog> {
		return await this.saveInstance(this.payload);
	}
}
