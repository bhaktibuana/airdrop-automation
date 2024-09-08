import { Router } from 'express';

import { SettingRouter } from '@/app/routers/setting.router';

export class AppRouter {
	constructor(router: Router) {
		new SettingRouter(router);
	}
}
