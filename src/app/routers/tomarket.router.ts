import { Router } from 'express';

import { RouterLibrary } from '@/libs';
import { TomarketController } from '@/app/controllers';

export class TomarketRouter extends RouterLibrary<TomarketController> {
	constructor(router: Router) {
		super(router, '/tomarket', new TomarketController());

		this.get('/account-info', this.controller.accountInfo);
	}
}
