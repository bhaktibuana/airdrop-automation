import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AccountInfoQueryDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;
}

export class FarmingLogsQueryDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;

	@IsString()
	status!: string;

	@Transform(({ value }) => Number(value) || 0)
	@IsNumber()
	page!: number;

	@Transform(({ value }) => Number(value) || 10)
	@IsNumber()
	per_page!: number;
}

export class ActivateAccountBodyDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;
}

export class DeactivateAccountBodyDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;
}
