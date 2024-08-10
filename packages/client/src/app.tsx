import { useState, type ChangeEvent } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";

type Hotel = {
  _id: string,
  chain_name: string;
  hotel_name: string;
  city: string,
  country: string
};

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

// TODO: Add:
//   loading and error states/messages,
//   AbortController,
//   Min char length + input placeholder

const fetchAndFilterHotels = async (value: string) => {
  try {
    const hotelsData = await fetch(`${API_URL}/hotels`);
    const hotels = (await hotelsData.json()) as Hotel[];
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

function App() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetchData(); // TODO: Add debounce
  }

  const fetchData = async () => {
    if (searchTerm === '') {
      setHotels([]);
      setShowClearBtn(false);
      return;
    }

    const filteredHotels = await fetchAndFilterHotels(searchTerm);
    setShowClearBtn(true);
    setHotels(filteredHotels);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setHotels([]);
  }

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
              {!!hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {hotels.length ? hotels.map((hotel, index) => (
                    <li key={index}>
                      <a href={`/hotels/${hotel._id}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.hotel_name}
                      </a>
                      <hr className="divider" />
                    </li>
                  )) : <p>No hotels matched</p>}
                  <h2>Countries</h2>
                  <p>No countries matched</p>
                  <h2>Cities</h2>
                  <p>No cities matched</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
