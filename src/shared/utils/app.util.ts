export class AppUtil {
	public static async sleep(ms: number) {
		return await new Promise((resolve) => setTimeout(resolve, ms));
	}
}
