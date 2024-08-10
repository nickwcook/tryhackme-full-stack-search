import { getCodeSandboxHost } from "@codesandbox/utils";
import Hotel from "../types/Hotel.type.ts";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

export const fetchAndFilterHotels = async (value: string) => {
	try {
		const hotelsData = await fetch(`${API_URL}/hotels`);
		const hotels = (await hotelsData.json()) as Hotel[];
		return hotels.filter(
			({ chain_name, hotel_name, city, country }) =>
				chain_name.toLowerCase().includes(value.toLowerCase()) ||
				hotel_name.toLowerCase().includes(value.toLowerCase()) ||
				city.toLowerCase().includes(value.toLowerCase()) ||
				country.toLowerCase().includes(value.toLowerCase())
		);
	} catch (error) {
		console.log('Error fetching hotels:', error);
		return [];
	}
}