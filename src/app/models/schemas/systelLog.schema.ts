import { Schema } from 'mongoose';
import dayjs from 'dayjs';

import { I_SystemLogBase } from '@/app/models/interfaces/systemLog.interface';

export class SystemLogSchema {
	public static getSchema() {
		return new Schema<I_SystemLogBase>({
			class_name: {
				type: String,
				required: true,
			},
			function_name: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
			message: {
				type: String,
				required: true,
			},
			data: {
				type: Object,
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
