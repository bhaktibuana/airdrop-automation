import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SystemLog } from '@/app/models';
import { AppError, HTTP } from '@/shared/utils';
import { T_AppErrorData } from '@/shared/types';

export abstract class Service {
	protected readonly STATUS_CODE = StatusCodes;

	protected errorHandler(
		statusCode: StatusCodes,
		message: string,
		errorData: T_AppErrorData = null,
	): void {
		throw new AppError(statusCode, message, errorData);
	}

	protected async systemLog(
		functionName: string,
		data: object | unknown = {},
		status: 'success' | 'failed' = 'failed',
	): Promise<void> {
		const systemLog = new SystemLog();
		systemLog.payload = {
			class_name: this.constructor.name,
			function_name: functionName,
			status,
			data,
		};
		await systemLog.save();
	}

	protected errorResponse<T>(res: Response, error: T): void {
		HTTP.errorResponse(res, error);
	}
}
