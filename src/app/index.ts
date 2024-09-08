import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import { routers } from '@/app/routers';
import { DatabaseConfig } from '@/configs';
import { TomarketScheduler } from '@/app/schedulers';

export class App {
	private readonly app = express();
	protected database: DatabaseConfig;
	protected tomarketScheduler: TomarketScheduler;

	constructor(port: number) {
		this.database = new DatabaseConfig();
		this.tomarketScheduler = new TomarketScheduler();

		this.init();
		this.middlewares();
		this.routes();
		this.listenServer(port);
		this.background();
	}

	/**
	 * App Init code
	 */
	private init(): void {
		// connect database
		this.database.connect();
	}

	/**
	 * App Middlewares
	 */
	private middlewares(): void {
		this.app.enable('trust proxy');
		this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(express.static(path.join(process.cwd(), './public')));
	}

	/**
	 * App Routes
	 */
	private routes(): void {
		this.app.use('/', routers);
	}

	/**
	 * App Listener
	 *
	 * @param port number
	 */
	private listenServer(port: number): void {
		this.app.listen(port, () => {
			console.log('App is running on port', port);
		});
	}

	/**
	 * Execute every running background codes
	 */
	private background(): void {
		this.tomarketScheduler.farming();
	}
}
