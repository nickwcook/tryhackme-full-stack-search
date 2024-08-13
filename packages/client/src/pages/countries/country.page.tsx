import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { Country } from "types";
import { fetchCountryById } from "utils/search.utils";

const CountryPage = () => {
	// const countryData = (useLoaderData() as Country); Sample: Please see submission notes
	const { id } = useParams() as { id: string };
	const [countryData, setCountryData] = useState<Country | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const fetchCountryData = useCallback(async () => {
		try {
			const data = await fetchCountryById(id);
			setCountryData(data);
		} catch (error) {
			if (isAxiosError(error)) {
				setErrorMessage("Error fetching country data: " + error.message);
			} else {
				setErrorMessage("Error fetching country data: " + JSON.stringify(error));
			}
		} finally {
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchCountryData();
	}, [fetchCountryData]);

	return (
		<div className="container p-5">
			{!isLoading && !errorMessage && countryData && (
				<h1>{countryData.country}</h1>
			)}
			{isLoading && <p>Loading country data...</p>}
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	)
}

export default CountryPage;