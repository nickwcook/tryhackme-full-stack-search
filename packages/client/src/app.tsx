import { useState, type ChangeEvent } from 'react';
import {
  fetchAndFilterCities,
  fetchAndFilterCountries,
  fetchAndFilterHotels
} from "./utils/search.utils";
import Hotel from "./types/Hotel.type";
import City from "./types/City.type";
import Country from "./types/Country.type";

// TODO: Add:
//   loading and error states/messages,
//   AbortController,
//   Min char length + input placeholder

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  // TODO: Combine state values into 'searchResults'
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetchData(); // TODO: Add debounce
  }

  const fetchData = async () => {
    if (searchTerm === '') {
      resetSearchResults();
      setShowClearBtn(false);
      return;
    }

    // TODO: Combine logic into single function?
    const filteredHotels = await fetchAndFilterHotels(searchTerm);
    const filteredCountries = await fetchAndFilterCountries(searchTerm);
    const filteredCities = await fetchAndFilterCities(searchTerm);
    setShowClearBtn(true);
    setHotels(filteredHotels);
    setCountries(filteredCountries);
    setCities(filteredCities);
  };

  const resetSearchResults = () => {
    setHotels([]);
    setCities([]);
    setCountries([]);
  }

  const handleClearInput = () => {
    setSearchTerm('');
    resetSearchResults();
  }

  const renderSearchResults = () => (
    !!(hotels.length || cities.length || countries.length) && (
      <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
        {renderHotelResults()}
        {renderCountryResults()}
        <h2>Cities</h2>
        <p>No cities matched</p>
      </div>
    )
  );

  const renderHotelResults = () => (
    <>
      <h2>Hotels</h2>
      {hotels.length ? hotels.map((hotel, index) => (
        <li key={index}>
          <a href={`/hotels/${hotel._id}`} className="dropdown-item">
            <i className="fa fa-building mr-2"></i>
            {hotel.hotel_name}
          </a>
          <hr className="divider"/>
        </li>
      )) : <p>No hotels matched</p>}
    </>
  );

  const renderCountryResults = () => (
    <>
      <h2>Countries</h2>
      {countries.length ? countries.map((country, index) => {
        const { country: countryName } = country; // Note observation re. field 'country'
        return (
          <li key={index}>
            <a href={`/hotels/${country._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {countryName}
            </a>
            <hr className="divider"/>
          </li>
        )
      }) : <p>No countries matched</p>}
    </>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {showClearBtn && (
                  <span className="left-pan">
                    <i className="fa fa-close" onClick={handleClearInput}></i>
                  </span>
                )}
              </div>
              {renderSearchResults()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
