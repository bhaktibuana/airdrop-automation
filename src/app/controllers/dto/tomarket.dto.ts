import { IsString, IsNotEmpty } from 'class-validator';

export class AccountInfoQueryDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;
}
