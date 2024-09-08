import { I_Pagination } from '@/shared/interfaces';

export type T_Pagination = I_Pagination | null;

export type T_Console = 'log' | 'error';

export type T_AccountType = 'telegram';

export type T_AppErrorData =
	| Object
	| Array<Object | string | number | boolean | null>
	| null
	| unknown;
