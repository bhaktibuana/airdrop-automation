import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export class AppConfig {
	public static readonly nodeEnv = process.env.NODE_ENV || '';
	public static readonly port = parseInt(process.env.PORT || '');
	public static readonly baseUrl = process.env.BASE_URL || '';
}
