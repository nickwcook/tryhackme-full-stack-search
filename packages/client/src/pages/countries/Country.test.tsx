import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import mockServer from "mocks/node";
import countriesMock from "mocks/data/countries.mock.json";
import CountryPage from "pages/countries/Country.page.tsx";

describe("CountryPage", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", () => ({
      ...vi.importActual("react-router-dom"),
      useParams: vi.fn().mockReturnValue({
        id: "001",
      }),
    }));
  });

  describe("loading country data", () => {
    it("renders loading text", () => {
      render(<CountryPage />);
      const loadingText = screen.getByText("Loading country data...");
      expect(loadingText).toBeInTheDocument();
    });
  });

  describe("loading country data", () => {
    it("renders loading text", () => {
      render(<CountryPage />);
      const loadingText = screen.getByText("Loading country data...");
      const errorText = screen.queryByText(/Error fetching country data.../i);
      expect(loadingText).toBeInTheDocument();
      expect(errorText).not.toBeInTheDocument();
    });
  });

  describe("when fetch unsuccessful", () => {
    beforeEach(() => {
      mockServer.use(
        http.get(
          `http://localhost:3001/countries/:id`,
          () => HttpResponse.error(),
          { once: true },
        ),
      );
    });

    it("renders error text", async () => {
      await act(async () => render(<CountryPage />));
      const loadingText = screen.queryByText("Loading country data...");
      const errorText = screen.getByText(/Error fetching country data.../i);
      expect(loadingText).not.toBeInTheDocument();
      expect(errorText).toBeInTheDocument();
    });
  });

  describe("when fetch successful", () => {
    it("renders country name", async () => {
      await act(async () => render(<CountryPage />));
      const loadingText = screen.queryByText("Loading country data...");
      const errorText = screen.queryByText(/Error fetching country data.../i);
      const countryName = screen.getByText(countriesMock[0].country);
      expect(loadingText).not.toBeInTheDocument();
      expect(errorText).not.toBeInTheDocument();
      expect(countryName).toBeInTheDocument();
    });
  });
});
