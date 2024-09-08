export interface I_Pagination {
	total_items?: number;
	total_pages?: number;
	per_page?: number;
	current_page?: number;
	next_page?: number | null;
	previous_page?: number | null;
}

export interface I_HTTPResponse<T> {
	message: string;
	status: boolean;
	status_code: number;
	data: T | null;
	error: T | null;
	pagination: I_Pagination | null;
}

export interface I_TomarketLoginBody {
	init_data: string;
	invite_code: string;
	from: string;
	is_bot: boolean;
}

export interface I_TomarketLoginResponse {
	data: {
		tel_id: string;
		id: number;
		fn: string;
		ln: string;
		access_token: string;
		photo_url: string;
		is_kol: number;
	};
}

export interface I_TomarketBalanceResponse {
	data: {
		available_balance: string;
		play_passes: number;
		timestamp: number;
		farming: {
			game_id: string;
			round_id: string;
			user_id: number;
			start_at: number;
			end_at: number;
			last_claim: number;
			points: number;
		};
		daily: {
			round_id: string;
			user_id: number;
			start_at: number;
			last_check_ts: number;
			last_check_ymd: number;
			next_check_ts: number;
			check_counter: number;
			today_points: number;
			today_game: number;
			diff: number;
		};
	};
}

export interface I_TomarketRankResponse {
	data: {
		currentRank: {
			rank: number;
			minStar: number;
			maxStar: number;
			name: string;
			level: number;
			range: number;
			rankPercent: string;
			stars: number;
			sameRankCount: number;
			inFrontRankCount: number;
		};
		preRank: {
			rank: number;
			minStar: number;
			maxStar: number;
			name: string;
			level: number;
			range: number;
			rankPercent: string;
		};
		nextRank: {
			rank: number;
			minStar: number;
			maxStar: number;
			name: string;
			level: number;
			range: number;
			rankPercent: string;
		};
		isCreated: boolean;
		unusedStars: number;
		usedStars: number;
		futureRankName: string;
	};
}
