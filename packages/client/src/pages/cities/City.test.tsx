import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import mockServer from "mocks/node";
import citiesMock from "mocks/data/cities.mock.json";
import CityPage from "pages/cities/City.page.tsx";

describe("CityPage", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", () => ({
      ...vi.importActual("react-router-dom"),
      useParams: vi.fn().mockReturnValue({
        id: "001",
      }),
    }));
  });

  describe("loading city data", () => {
    it("renders loading text", () => {
      render(<CityPage />);
      const loadingText = screen.getByText("Loading city data...");
      expect(loadingText).toBeInTheDocument();
    });
  });

  describe("loading city data", () => {
    it("renders loading text", () => {
      render(<CityPage />);
      const loadingText = screen.getByText("Loading city data...");
      const errorText = screen.queryByText(/Error fetching city data.../i);
      expect(loadingText).toBeInTheDocument();
      expect(errorText).not.toBeInTheDocument();
    });
  });

  describe("when fetch unsuccessful", () => {
    beforeEach(() => {
      mockServer.use(
        http.get(
          `http://localhost:3001/cities/:id`,
          () => HttpResponse.error(),
          { once: true },
        ),
      );
    });

    it("renders error text", async () => {
      await act(async () => render(<CityPage />));
      const loadingText = screen.queryByText("Loading city data...");
      const errorText = screen.getByText(/Error fetching city data.../i);
      expect(loadingText).not.toBeInTheDocument();
      expect(errorText).toBeInTheDocument();
    });
  });

  describe("when fetch successful", () => {
    it("renders city name", async () => {
      await act(async () => render(<CityPage />));
      const loadingText = screen.queryByText("Loading city data...");
      const errorText = screen.queryByText(/Error fetching city data.../i);
      const cityName = screen.getByText(citiesMock[0].name);
      expect(loadingText).not.toBeInTheDocument();
      expect(errorText).not.toBeInTheDocument();
      expect(cityName).toBeInTheDocument();
    });
  });
});
