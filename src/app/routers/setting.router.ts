import { Router } from 'express';

import { RouterLibrary } from '@/libs';
import { SettingController } from '@/app/controllers';

export class SettingRouter extends RouterLibrary<SettingController> {
	constructor(router: Router) {
		super(router, '/setting', new SettingController());

		this.post('/create-account', this.controller.createAccount);
	}
}
