import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError, HTTP } from '@/shared/utils';
import { T_Pagination } from '@/shared/types';
import { SystemLog } from '@/app/models';

export abstract class Controller {
	protected readonly STATUS_CODE = StatusCodes;

	protected response<T>(
		res: Response,
		message: string,
		statusCode: StatusCodes,
		data: T | null = null,
	): void {
		HTTP.response(res, message, statusCode, data);
	}

	protected responsePagination<T>(
		res: Response,
		message: string,
		statusCode: StatusCodes,
		data: T | null = null,
		pagination: T_Pagination = null,
	): void {
		HTTP.response(res, message, statusCode, data, pagination);
	}

	protected errorResponse<T>(res: Response, error: T): void {
		HTTP.errorResponse(res, error);
	}

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
