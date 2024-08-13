import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app.tsx";
import HotelPage from "pages/hotels/Hotel.page.tsx";
import CountryPage from "pages/countries/Country.page.tsx";
import CityPage from "pages/cities/City.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/hotels/:id",
    element: <HotelPage />,
    // loader: async ({ params }) => fetchHotelById(params.id || "") Sample: Please see submission notes
  },
  {
    path: "/countries/:id",
    element: <CountryPage />,
  },
  {
    path: "/cities/:id",
    element: <CityPage />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
