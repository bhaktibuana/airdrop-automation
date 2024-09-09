import cron from 'node-cron';

import { TomarketService } from '@/app/services';

export class TomarketScheduler {
	protected tomarketSvc: TomarketService;

	constructor() {
		this.tomarketSvc = new TomarketService();
	}

	/**
	 * Farming Tomarket every 30 minutes
	 */
	public farming() {
		cron.schedule('*/30 * * * *', async () => {
			const usernames = await this.tomarketSvc.getActiveUsername();
			usernames.forEach((username) => {
				this.tomarketSvc.farming(username as string);
			});
		});
	}
}
