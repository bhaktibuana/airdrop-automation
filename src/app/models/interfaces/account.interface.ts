import { Document } from 'mongoose';

import { T_AccountType } from '@/shared/types';

export interface I_Account extends I_AccountBase, Document {}

export interface I_AccountBase {
	type?: T_AccountType;
	username?: string;
	token?: string;
	active?: boolean;
	active_airdrops?: string[];
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}
