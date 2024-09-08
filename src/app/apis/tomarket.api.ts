import { ApiLibrary } from '@/libs';
import { ApiConfig } from '@/configs';
import {
	I_TomarketBalanceResponse,
	I_TomarketFarmClaimResponse,
	I_TomarketFarmStartResponse,
	I_TomarketGameClaimResponse,
	I_TomarketGameShareResponse,
	I_TomarketGameStartResponse,
	I_TomarketHiddenStartResponse,
	I_TomarketHiddenStatusResponse,
	I_TomarketLoginBody,
	I_TomarketLoginResponse,
	I_TomarketRankResponse,
	I_TomarketUpgradeRankResponse,
} from '@/shared/interfaces';

export class TomarketApi extends ApiLibrary {
	constructor() {
		super(ApiConfig.tomarketApi);
	}

	public async login(
		data: I_TomarketLoginBody,
	): Promise<I_TomarketLoginResponse> {
		const path = '/tomarket-game/v1/user/login';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'Content-Length': '472',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Priority: 'u=3, i',
			Cookie: '__cf_bm=9c.mowkXssYdiHxNBYnyZ87DhrXZJu7Z8mQeFbGHbHY-1725795412-1.0.1.1-HLZqdc2rzjebawAJVKxeAIvLSTIyzBT8V51NRtOmnZfVqUj8_bCYgy3VHgoQDjJWMcPbnFLPeYlytQ1eKcey_A',
		};

		return await this.post<I_TomarketLoginResponse>(path, data, {
			headers,
		});
	}

	public async balance(
		accessToken: string,
	): Promise<I_TomarketBalanceResponse> {
		const path = '/tomarket-game/v1/user/balance';

		const headers = {
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'Content-Length': '0',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Priority: 'u=3, i',
			Cookie: '__cf_bm=Ug4B.eXc_mT5bonac7PTzx8bcgKaxVpDPyFlll2SKnY-1725798812-1.0.1.1-Z9V3grG.trHDM9VBNFzV7F6LfoJmu_xiToc05C59kGFYmafBZq6CvUiI6wTZ2_O32jtUqRGHMwScL1n9PFFDKg',
		};

		return await this.post<I_TomarketBalanceResponse>(
			path,
			{},
			{ headers },
		);
	}

	public async rank(accessToken: string): Promise<I_TomarketRankResponse> {
		const path = '/tomarket-game/v1/rank/data';

		const headers = {
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'Content-Length': '0',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Priority: 'u=3, i',
			Cookie: '__cf_bm=Ug4B.eXc_mT5bonac7PTzx8bcgKaxVpDPyFlll2SKnY-1725798812-1.0.1.1-Z9V3grG.trHDM9VBNFzV7F6LfoJmu_xiToc05C59kGFYmafBZq6CvUiI6wTZ2_O32jtUqRGHMwScL1n9PFFDKg',
		};

		return await this.post<I_TomarketRankResponse>(path, {}, { headers });
	}

	public async farmClaim(
		accessToken: string,
		gameId: string,
	): Promise<I_TomarketFarmClaimResponse> {
		const path = '/tomarket-game/v1/farm/claim';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'Content-Length': '50',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Cookie: '__cf_bm=me6uQTwGVCgIG7Ml92u0bRwEg8RLYPn5Pe.6JBcCTzM-1725801945-1.0.1.1-eqqpX3iYAp4tGoreF4kE3qbwHt6f5mdpdo_dT6CxJJyZJQqxXW10luW_5933wwaemK2WbgUw9m4blMNpaydDVg',
		};

		return await this.post<I_TomarketFarmClaimResponse>(
			path,
			{ game_id: gameId },
			{ headers },
		);
	}

	public async farmStart(
		accessToken: string,
		gameId: string,
	): Promise<I_TomarketFarmStartResponse> {
		const path = '/tomarket-game/v1/farm/start';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'Content-Length': '50',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Cookie: '__cf_bm=me6uQTwGVCgIG7Ml92u0bRwEg8RLYPn5Pe.6JBcCTzM-1725801945-1.0.1.1-eqqpX3iYAp4tGoreF4kE3qbwHt6f5mdpdo_dT6CxJJyZJQqxXW10luW_5933wwaemK2WbgUw9m4blMNpaydDVg',
		};

		return await this.post<I_TomarketFarmStartResponse>(
			path,
			{ game_id: gameId },
			{ headers },
		);
	}

	public async hiddenStatus(
		accessToken: string,
	): Promise<I_TomarketHiddenStatusResponse> {
		const path = '/tomarket-game/v1/tasks/hidden';

		const headers = {
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Cookie: '__cf_bm=_YEgvy1GLthDyuabN4DmqFZPtdzbOfxTsGdQ.EeKP3s-1725800475-1.0.1.1-Y5FZMW5xG9MLLbK2JFSMWNNzuxEANVIT3RVbEcVp_PU93OUNetpW9mWVYDWZH2Yj.ywVGRm0IycQCRhGP__IAg',
		};

		return await this.post<I_TomarketHiddenStatusResponse>(
			path,
			{},
			{ headers },
		);
	}

	public async hiddenClaim(
		accessToken: string,
		taskId: number,
	): Promise<I_TomarketHiddenStartResponse> {
		const path = '/tomarket-game/v1/tasks/claim';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Priority: 'u=3, i',
			Cookie: '__cf_bm=_YEgvy1GLthDyuabN4DmqFZPtdzbOfxTsGdQ.EeKP3s-1725800475-1.0.1.1-Y5FZMW5xG9MLLbK2JFSMWNNzuxEANVIT3RVbEcVp_PU93OUNetpW9mWVYDWZH2Yj.ywVGRm0IycQCRhGP__IAg',
		};

		return await this.post<I_TomarketHiddenStartResponse>(
			path,
			{ task_id: taskId },
			{ headers },
		);
	}

	public async gameStart(
		accessToken: string,
		gameId: string,
	): Promise<I_TomarketGameStartResponse> {
		const path = '/tomarket-game/v1/game/play';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
		};

		return await this.post<I_TomarketGameStartResponse>(
			path,
			{ game_id: gameId },
			{ headers },
		);
	}

	public async gameClaim(
		accessToken: string,
		gameId: string,
	): Promise<I_TomarketGameClaimResponse> {
		const path = '/tomarket-game/v1/game/claim';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
		};

		return await this.post<I_TomarketGameClaimResponse>(
			path,
			{ game_id: gameId, points: 600 },
			{ headers },
		);
	}

	public async gameShare(
		accessToken: string,
		gameId: string,
	): Promise<I_TomarketGameShareResponse> {
		const path = '/tomarket-game/v1/game/share';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
		};

		return await this.post<I_TomarketGameShareResponse>(
			path,
			{ game_id: gameId },
			{ headers },
		);
	}

	public async upgradeRank(
		accessToken: string,
		stars: number,
	): Promise<I_TomarketUpgradeRankResponse> {
		const path = '/tomarket-game/v1/rank/upgrade';

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: accessToken,
			'Sec-Fetch-Site': 'same-site',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Sec-Fetch-Mode': 'cors',
			Host: 'api-web.tomarket.ai',
			Origin: 'https://mini-app.tomarket.ai',
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
			Referer: 'https://mini-app.tomarket.ai/',
			Connection: 'keep-alive',
			'Sec-Fetch-Dest': 'empty',
			Cookie: '__cf_bm=jHhbGIduSq1nsHqlq7HbxvSh8uDbrawpVGU0T14P5_Q-1725809472-1.0.1.1-XxrM6g3rid_.Cw.c6YFMdoJm7SrbhxDjdZHY9_r8EpiWpVwicGe9O8gKYitqfikEr2urJnIaIjbzyDob4FLP8w',
		};

		return await this.post<I_TomarketUpgradeRankResponse>(
			path,
			{ stars },
			{ headers },
		);
	}
}
