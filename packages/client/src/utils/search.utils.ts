import { getCodeSandboxHost } from "@codesandbox/utils";
import Axios from "axios";
import Hotel from "../types/Hotel.type";
import City from "../types/City.type";
import Country from "../types/Country.type.ts";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

export const fetchAndFilterHotels = async (value: string) => {
	try {
		const { data: hotels }: { data: Hotel[] } = await Axios.get(`${API_URL}/hotels`);
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

export const fetchAndFilterCities = async (value: string) => {
	try {
		const { data: cities }: { data: City[] } = await Axios.get(`${API_URL}/cities`);
		return cities.filter(
			({ name }) =>
				name.toLowerCase().includes(value.toLowerCase())
		);
	} catch (error) {
		console.log('Error fetching cities:', error);
		return [];
	}
}

export const fetchAndFilterCountries = async (value: string) => {
	try {
		const { data: countries }: { data: Country[] } = await Axios.get(`${API_URL}/countries`);
		return countries.filter(
			({ country: countryName, countryisocode }) =>
				countryName.toLowerCase().includes(value.toLowerCase()) ||
				countryisocode.toLowerCase().includes(value.toLowerCase())
		);
	} catch (error) {
		console.log('Error fetching countries:', error);
		return [];
	}
}