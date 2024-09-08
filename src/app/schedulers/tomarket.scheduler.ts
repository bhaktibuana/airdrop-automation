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
		cron.schedule('10 */3 * * *', async () => {
			const usernames = await this.tomarketSvc.getActiveUsername();
			usernames.forEach((username) => {
				this.tomarketSvc.farming(username as string);
			});
		});
	}
}
