import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import mockServer from "mocks/node";
import hotelsMock from "mocks/data/hotels.mock.json";
import HotelPage from "pages/hotels/Hotel.page.tsx";

describe("HotelPage", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", () => ({
      ...vi.importActual("react-router-dom"),
      useParams: vi.fn().mockReturnValue({
        id: "001",
      }),
    }));
  });

  describe("loading hotel data", () => {
    it("renders loading text", () => {
      render(<HotelPage />);
      const loadingText = screen.getByText("Loading hotel data...");
      expect(loadingText).toBeInTheDocument();
    });
  });

  describe("loading hotel data", () => {
    it("renders loading text", () => {
      render(<HotelPage />);
      const loadingText = screen.getByText("Loading hotel data...");
      const errorText = screen.queryByText(/Error fetching hotel data.../i);
      expect(loadingText).toBeInTheDocument();
      expect(errorText).not.toBeInTheDocument();
    });
  });

  describe("when fetch unsuccessful", () => {
    beforeEach(() => {
      mockServer.use(
        http.get(
          `http://localhost:3001/hotels/:id`,
          () => HttpResponse.error(),
          { once: true },
        ),
      );
    });

    it("renders error text", async () => {
      await act(async () => render(<HotelPage />));
      const loadingText = screen.queryByText("Loading hotel data...");
      const errorText = screen.getByText(/Error fetching hotel data.../i);
      expect(loadingText).not.toBeInTheDocument();
      expect(errorText).toBeInTheDocument();
    });
  });

  describe("when fetch successful", () => {
    it("renders hotel name", async () => {
      await act(async () => render(<HotelPage />));
      const loadingText = screen.queryByText("Loading hotel data...");
      const errorText = screen.queryByText(/Error fetching hotel data.../i);
      const hotelName = screen.getByText(hotelsMock[0].hotel_name);
      expect(loadingText).not.toBeInTheDocument();
      expect(errorText).not.toBeInTheDocument();
      expect(hotelName).toBeInTheDocument();
    });
  });
});
