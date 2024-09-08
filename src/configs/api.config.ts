import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export class ApiConfig {
	public static readonly tomarketApi = process.env.TOMARKET_API || '';
}
