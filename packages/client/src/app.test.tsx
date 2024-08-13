import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "app.tsx";
import * as searchUtils from "utils/search.utils";

describe("App component", () => {
  beforeAll(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.spyOn(searchUtils, "fetchAndFilterHotels");
    vi.spyOn(searchUtils, "fetchAndFilterCountries");
    vi.spyOn(searchUtils, "fetchAndFilterCities");
    vi.spyOn(AbortController.prototype, "abort").mockImplementation(vi.fn);
  });

  describe("when no search term", () => {
    it("does not render any hotels, countries or cities", async () => {
      await act(async () => render(<App />));
      const hotelsText = screen.queryByText("Hotels");
      const countriesText = screen.queryByText("Countries");
      const citiesText = screen.queryByText("Cities");
      expect(hotelsText).not.toBeInTheDocument();
      expect(countriesText).not.toBeInTheDocument();
      expect(citiesText).not.toBeInTheDocument();
    });

    it("does not show the clear button", async () => {
      await act(async () => render(<App />));
      const clearButton = screen.queryByTitle("Clear search");
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe("user enters multi-character search term", () => {
    it("initiates single fetch request for each of hotels/countries/cities after a 500ms debounce", async () => {
      const user = userEvent.setup();
      await act(async () => render(<App />));
      const input = screen.getByRole("textbox");
      await user.type(input, "a");
      await waitFor(
        () => {
          expect(searchUtils.fetchAndFilterHotels).toHaveBeenCalledTimes(0);
          expect(searchUtils.fetchAndFilterCountries).toHaveBeenCalledTimes(0);
          expect(searchUtils.fetchAndFilterCities).toHaveBeenCalledTimes(0);
        },
        { timeout: 400 },
      );
      await user.type(input, "b");
      await waitFor(
        () => {
          expect(searchUtils.fetchAndFilterHotels).toHaveBeenCalledTimes(0);
          expect(searchUtils.fetchAndFilterCountries).toHaveBeenCalledTimes(0);
          expect(searchUtils.fetchAndFilterCities).toHaveBeenCalledTimes(0);
        },
        { timeout: 500 },
      );
      await user.type(input, "c");
      await waitFor(
        () => {
          expect(searchUtils.fetchAndFilterHotels).toHaveBeenCalledTimes(1);
          expect(searchUtils.fetchAndFilterCountries).toHaveBeenCalledTimes(1);
          expect(searchUtils.fetchAndFilterCities).toHaveBeenCalledTimes(1);
        },
        { timeout: 501 },
      );
    });

    it("shows the clear button", async () => {
      const user = userEvent.setup();
      await act(async () => render(<App />));
      const input = screen.getByRole("textbox");
      await user.type(input, "a");
      const clearButton = screen.getByTitle("Clear search");
      expect(clearButton).toBeInTheDocument();
    });
  });
});
