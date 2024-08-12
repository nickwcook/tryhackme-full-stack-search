import {useCallback, useEffect, useState} from "react";
import Hotel from "../types/Hotel.type.ts";
import Country from "../types/Country.type.ts";
import City from "../types/City.type.ts";
import {fetchAndFilterCities, fetchAndFilterCountries, fetchAndFilterHotels} from "../utils/search.utils.ts";

export const useAccommodationSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);

	const resetSearchResults = () => {
		setHotels([]);
		setCountries([]);
		setCities([]);
	}

	const fetchData = useCallback(async () => {
		// TODO: Add error-handling/try-catch
		const filteredHotels = await fetchAndFilterHotels(searchTerm);
		const filteredCountries = await fetchAndFilterCountries(searchTerm);
		const filteredCities = await fetchAndFilterCities(searchTerm);
		setHotels(filteredHotels);
		setCountries(filteredCountries);
		setCities(filteredCities);
	}, [searchTerm]);

	useEffect(() => {
		if (!searchTerm.length) {
			setShowClearBtn(false);
			resetSearchResults();
		} else {
			setShowClearBtn(true);
			fetchData();
		}
	}, [fetchData, searchTerm]);

	return {
		searchTerm,
		setSearchTerm,
		showClearBtn,
		resetSearchResults,
		hotels,
		countries,
		cities,
	}
};