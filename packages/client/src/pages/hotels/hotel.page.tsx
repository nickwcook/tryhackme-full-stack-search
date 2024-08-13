import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { Hotel } from "types";
import { fetchHotelById } from "utils/search.utils";

const HotelPage = () => {
	// const hotelData = (useLoaderData() as Hotel); Sample: Please see submission notes
	const { id } = useParams() as { id: string };
	const [hotelData, setHotelData] = useState<Hotel | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const fetchHotelData = useCallback(async () => {
		try {
			const data = await fetchHotelById(id);
			setHotelData(data);
		} catch (error) {
			if (isAxiosError(error)) {
				setErrorMessage("Error fetching hotel data: " + error.message);
			} else {
				setErrorMessage("Error fetching hotel data: " + JSON.stringify(error));
			}
		} finally {
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchHotelData();
	}, [fetchHotelData]);

	return (
		<div className="container p-5">
			{!isLoading && !errorMessage && hotelData && (
				<h1>{hotelData.hotel_name}</h1>
			)}
			{isLoading && <p>Loading hotel data...</p>}
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	)
}

export default HotelPage;