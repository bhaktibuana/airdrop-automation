import { Document } from 'mongoose';

export interface I_SystemLog extends I_SystemLogBase, Document {}

export interface I_SystemLogBase {
	class_name?: string;
	function_name?: string;
	status?: 'success' | 'failed';
	message?: string;
	data?: Object;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}
