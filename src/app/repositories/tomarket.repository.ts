import { PipelineStage } from 'mongoose';

import { SystemLog } from '@/app/models';
import { I_Pagination } from '@/shared/interfaces';

export class TomarketRepository {
	public async getSystemLogs(
		username: string,
		status: string,
		paginate: I_Pagination,
	) {
		const logStatus = status ? (status !== 'all' ? status : null) : null;
		const statusQuery = logStatus ? status : { $exists: true };
		const page = paginate.current_page || 0;
		const perPage = paginate.per_page || 10;

		const systemLog = new SystemLog();

		const match: PipelineStage = {
			$match: {
				slug: 'tomarket',
				status: statusQuery,
				'data.username': username,
				deleted_at: null,
			},
		};

		const countData = await systemLog.getRaw([
			match,
			{
				$count: 'total',
			},
		]);

		const count = ((countData as any)[0]?.total as number) || 0;

		const data = await systemLog.getRaw([
			match,
			{
				$project: {
					class_name: 1,
					function_name: 1,
					slug: 1,
					status: 1,
					username: '$data.username',
					account_info: {
						account_before: '$data.account_before',
						account_after: '$data.account_after',
					},
					created_at: 1,
					updated_at: 1,
				},
			},
			{
				$sort: {
					create: -1,
				},
			},
			{
				$skip: page * perPage,
			},
			{
				$limit: perPage,
			},
		]);

		return {
			data,
			pagination: {
				current_page: page,
				per_page: perPage,
				total_items: count,
				total_pages: count > 0 ? Math.floor(count / perPage) + 1 : 0,
			} as I_Pagination,
		};
	}
}
