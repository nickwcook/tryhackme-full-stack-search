import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from "./app.tsx";
import HotelPage from "./pages/hotels/hotel.page.tsx";
import CountryPage from "./pages/countries/country.page.tsx";
import CityPage from "./pages/cities/city.page.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/hotels/:id",
		element: <HotelPage />
	},
	{
		path: "/countries/:id",
		element: <CountryPage />
	},
	{
		path: "/city/:id",
		element: <CityPage />
	}
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;