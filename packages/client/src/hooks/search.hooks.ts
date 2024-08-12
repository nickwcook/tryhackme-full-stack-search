import { useCallback, useMemo, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import debounce from "lodash.debounce";
import { City, Country, Hotel } from "../types";
import {
	fetchAndFilterCities,
	fetchAndFilterCountries,
	fetchAndFilterHotels
} from "../utils/search.utils";

export const useAccommodationSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showClearBtn, setShowClearBtn] = useState<boolean>(false); // Should hook be unaware of component UI?
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const resetSearchResults = () => {
		setHotels([]);
		setCountries([]);
		setCities([]);
	}

	const fetchData = useCallback(async (abortController: AbortController) => {
		setIsLoading(true);

		try {
			const [hotels, countries, cities] = await Promise.all([
				fetchAndFilterHotels(searchTerm, abortController),
				fetchAndFilterCountries(searchTerm, abortController),
				fetchAndFilterCities(searchTerm, abortController)
			])
			setHotels(hotels);
			setCountries(countries);
			setCities(cities);
		} catch (error) {
			if (isAxiosError(error)) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(JSON.stringify(error));
			}
		} finally {
			setIsLoading(false);
		}
	}, [searchTerm]);

	const debouncedFetch = useMemo(() =>
		debounce((abortController) => fetchData(abortController), 500), [fetchData]);

	useEffect(() => {
		let abortController: AbortController;
		setErrorMessage('');

		if (!searchTerm.length) {
			setShowClearBtn(false);
			resetSearchResults();
		} else {
			abortController = new AbortController();
			setShowClearBtn(true);
			debouncedFetch(abortController);
		}

		return () => {
			debouncedFetch.cancel();
			abortController?.abort();
		}
	}, [debouncedFetch, fetchData, searchTerm]);

	return {
		searchTerm,
		setSearchTerm,
		showClearBtn,
		resetSearchResults,
		hotels,
		countries,
		cities,
		isLoading,
		errorMessage
	}
};