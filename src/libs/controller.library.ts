import e, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SystemLog } from '@/app/models';
import { AppError, HTTP } from '@/shared/utils';
import { T_AppErrorData, T_Pagination } from '@/shared/types';

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

	protected async getRequestBody<T>(
		dtoClass: ClassConstructor<T>,
		req: Request,
	) {
		const reqBody = plainToInstance(dtoClass, req.body);
		const errors = await validate(reqBody as object);

		if (errors.length > 1)
			this.errorHandler(400, 'Validation failed', errors);

		return reqBody;
	}
}
