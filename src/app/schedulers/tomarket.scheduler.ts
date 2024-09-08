import cron from 'node-cron';

import { TomarketService } from '@/app/services';

export class TomarketScheduler {
	protected tomarketSvc: TomarketService;

	constructor() {
		this.tomarketSvc = new TomarketService();
	}

	/**
	 * Farming Tomarket every 3 hours 10 minutes
	 */
	public farming() {
		cron.schedule('10 */3 * * *', () => {
			this.tomarketSvc.farming('bhaktibuana');
		});
	}
}
