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

	const fetchData = useCallback(async () => {
		setIsLoading(true);

		try {
			const filteredHotels = await fetchAndFilterHotels(searchTerm);
			const filteredCountries = await fetchAndFilterCountries(searchTerm);
			const filteredCities = await fetchAndFilterCities(searchTerm);
			setHotels(filteredHotels);
			setCountries(filteredCountries);
			setCities(filteredCities);
		} catch (error) {
			// TODO: Add error handler class
			if (isAxiosError(error)) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(JSON.stringify(error));
			}
		} finally {
			setIsLoading(false);
		}
	}, [searchTerm]);

	const debouncedFetch = useMemo(() => debounce(fetchData, 500), [fetchData]);

	useEffect(() => {
		setErrorMessage('');
		if (!searchTerm.length) {
			setShowClearBtn(false);
			resetSearchResults();
		} else {
			setShowClearBtn(true);
			debouncedFetch();
			return () => debouncedFetch.cancel();
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