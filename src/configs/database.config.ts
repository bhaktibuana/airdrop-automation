import mongoose from 'mongoose';

import { Console } from '@/shared/utils';

export class DatabaseConfig {
	private url: string;
	private dbName: string;

	constructor() {
		this.url = process.env.DATABASE_URL || '';
		this.dbName = process.env.DATABASE_NAME || '';
	}

	public connect() {
		try {
			mongoose.connect(this.url, { dbName: this.dbName });
			Console.log('Successfully connected to the database', '');
		} catch (error) {
			Console.error('Error connecting to the database', error);
			process.exit(1);
		}
	}
}
