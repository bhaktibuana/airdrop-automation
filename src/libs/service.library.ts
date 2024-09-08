import { StatusCodes } from 'http-status-codes';

import { SystemLog } from '@/app/models';
import { AppError } from '@/shared/utils';

export abstract class Service {
	protected readonly STATUS_CODE = StatusCodes;

	protected errorHandler(statusCode: StatusCodes, message: string): void {
		throw new AppError(statusCode, message);
	}

	protected async systemLog(
		className: string,
		functionName: string,
		message: string = '',
		data: object = {},
	): Promise<void> {
		const systemLog = new SystemLog();
		systemLog.payload = {
			class_name: className,
			function_name: functionName,
			message,
			data,
		};
		await systemLog.save();
	}
}
