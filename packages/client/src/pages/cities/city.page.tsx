import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { City } from "types";
import { fetchCityById } from "utils/search.utils";

const CityPage = () => {
  // const cityData = (useLoaderData() as City); Sample: Please see submission notes
  const { id } = useParams() as { id: string };
  const [cityData, setCityData] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchCityData = useCallback(async () => {
    try {
      const data = await fetchCityById(id);
      setCityData(data);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage("Error fetching city data: " + error.message);
      } else {
        setErrorMessage("Error fetching city data: " + JSON.stringify(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCityData();
  }, [fetchCityData]);

  return (
    <div className="container p-5">
      {!isLoading && !errorMessage && cityData && <h1>{cityData.name}</h1>}
      {isLoading && <p>Loading city data...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CityPage;
