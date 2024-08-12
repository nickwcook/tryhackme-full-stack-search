import { getCodeSandboxHost } from "@codesandbox/utils";
import Axios from "axios";
import { City, Country, Hotel } from "../types";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

export const fetchAndFilterHotels = async (value: string, abortController?: AbortController) => {
	try {
		const { data: hotels }: { data: Hotel[] } = await Axios.get(`${API_URL}/hotels`, {
			signal: abortController?.signal,
		});
		return hotels.filter(
			({ chain_name, hotel_name, city, country }) =>
				chain_name.toLowerCase().includes(value.toLowerCase()) ||
				hotel_name.toLowerCase().includes(value.toLowerCase()) ||
				city.toLowerCase().includes(value.toLowerCase()) ||
				country.toLowerCase().includes(value.toLowerCase())
		);
	} catch (error) {
		console.log("Error fetching hotels data:", error);
		throw error;
	}
}

export const fetchAndFilterCities = async (value: string, abortController?: AbortController) => {
	try {
		const { data: cities }: { data: City[] } = await Axios.get(`${API_URL}/cities`, {
			signal: abortController?.signal,
		});
		return cities.filter(
			({ name }) =>
				name.toLowerCase().includes(value.toLowerCase())
		);
	} catch (error) {
		console.log("Error fetching cities data:", error);
		throw error;
	}
}

export const fetchAndFilterCountries = async (value: string, abortController?: AbortController) => {
	try {
		const { data: countries }: { data: Country[] } = await Axios.get(`${API_URL}/countries`, {
			signal: abortController?.signal,
		});
		return countries.filter(
			({ country: countryName, countryisocode }) =>
				countryName.toLowerCase().includes(value.toLowerCase()) ||
				countryisocode.toLowerCase().includes(value.toLowerCase())
		);
	} catch (error) {
		console.log("Error fetching countries data:", error);
		throw error;
	}
}