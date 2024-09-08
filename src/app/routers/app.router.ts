import { Router } from 'express';

import { SettingRouter } from '@/app/routers/setting.router';
import { TomarketRouter } from '@/app/routers/tomarket.router';

export class AppRouter {
	constructor(router: Router) {
		new SettingRouter(router);
		new TomarketRouter(router);
	}
}
