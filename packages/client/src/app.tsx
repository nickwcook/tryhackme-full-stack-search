import { type ChangeEvent } from "react";
import { useAccommodationSearch } from "hooks/search.hooks";

function App() {
  const {
    searchTerm,
    setSearchTerm,
    showClearBtn,
    resetSearchResults,
    hotels,
    countries,
    cities,
    errorMessage,
  } = useAccommodationSearch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    resetSearchResults();
  };

  const renderInput = () => (
    <>
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
    </>
  );

  const renderSearchResults = () =>
    !!(hotels.length || cities.length || countries.length) && (
      <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
        {renderHotelResults()}
        {renderCountryResults()}
        {renderCityResults()}
      </div>
    );

  const renderHotelResults = () => (
    <>
      <h2>Hotels</h2>
      {hotels.length ? (
        hotels.map((hotel, index) => (
          <li key={index}>
            <a href={`/hotels/${hotel._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No hotels matched</p>
      )}
    </>
  );

  const renderCountryResults = () => (
    <>
      <h2>Countries</h2>
      {countries.length ? (
        countries.map((country, index) => {
          const { country: countryName } = country; // Note observation re. field 'country'
          return (
            <li key={index}>
              <a href={`/countries/${country._id}`} className="dropdown-item">
                <i className="fa fa-building mr-2"></i>
                {countryName}
              </a>
              <hr className="divider" />
            </li>
          );
        })
      ) : (
        <p>No countries matched</p>
      )}
    </>
  );

  const renderCityResults = () => (
    <>
      <h2>Cities</h2>
      {cities.length ? (
        cities.map((city, index) => {
          const { name: cityName } = city; // Note observation re. field 'country'
          return (
            <li key={index}>
              <a href={`/cities/${city._id}`} className="dropdown-item">
                <i className="fa fa-building mr-2"></i>
                {cityName}
              </a>
              <hr className="divider" />
            </li>
          );
        })
      ) : (
        <p>No cities matched</p>
      )}
    </>
  );

  const renderErrorMessage = () => (
    <p className="mt-3">Error retrieving search results: {errorMessage}</p>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">{renderInput()}</div>
              {errorMessage ? renderErrorMessage() : renderSearchResults()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
