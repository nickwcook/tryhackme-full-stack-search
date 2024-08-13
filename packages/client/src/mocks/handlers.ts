import { http, HttpResponse } from "msw";
import hotelsMock from "mocks/data/hotels.mock.json";
import countriesMock from "mocks/data/countries.mock.json";
import citiesMock from "mocks/data/cities.mock.json";

export const handlers = [
  // region hotels
  http.get("http://localhost:3001/hotels", () => {
    return HttpResponse.json(hotelsMock);
  }),

  http.get("http://localhost:3001/hotels/:id", () => {
    return HttpResponse.json(hotelsMock[0]);
  }),
  // endregion hotels

  // region countries
  http.get("http://localhost:3001/countries", () => {
    return HttpResponse.json(countriesMock);
  }),

  http.get("http://localhost:3001/countries/:id", () => {
    return HttpResponse.json(countriesMock[0]);
  }),
  // endregion countries

  // region cities
  http.get("http://localhost:3001/cities", () => {
    return HttpResponse.json(citiesMock);
  }),

  http.get("http://localhost:3001/cities/:id", () => {
    return HttpResponse.json(citiesMock[0]);
  }),
  // endregion cities
];
