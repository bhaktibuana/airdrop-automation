import { ApiLibrary } from '@/libs';
import { ApiConfig } from '@/configs';
import {
	I_TomarketBalanceResponse,
	I_TomarketLoginBody,
	I_TomarketLoginResponse,
	I_TomarketRankResponse,
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
}
