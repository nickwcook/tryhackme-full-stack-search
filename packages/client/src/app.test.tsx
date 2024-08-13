import { describe, it, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
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
    let user: UserEvent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await act(async () => render(<App />));
      input = screen.getByRole("textbox");
    });

    it("initiates single fetch request for each of hotels/countries/cities after a 500ms debounce", async () => {
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
      await user.type(input, "a");
      const clearButton = screen.getByTitle("Clear search");
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe("when user clicks the clear button", () => {
    let user: UserEvent;
    let input: HTMLInputElement;
    let clearButton: HTMLElement | null;

    beforeEach(async () => {
      user = userEvent.setup();
      await act(async () => render(<App />));
      input = screen.getByRole("textbox");
      await user.type(input, "a");
    });

    it("hides the clear button and clears the input", async () => {
      clearButton = screen.getByTitle("Clear search");
      await user.click(clearButton);
      clearButton = screen.queryByTitle("Clear search");
      expect(clearButton).not.toBeInTheDocument();
      expect(input.value).toBe("");
    });
  });

  describe("search results", () => {
    const cases = [
      // searchTerm, numHotels, numCountries, numCities
      ["spain", 2, 0, 0],
      ["dub", 1, 0, 0],
      ["b", 2, 2, 2],
      ["res", 1, 0, 0],
      ["uck", 0, 0, 1],
    ];

    test.each(cases)(
      `search term %s returns %i hotels, %i countries, %i cities`,
      async (searchTerm, numHotels, numCountries, numCities) => {
        const user = userEvent.setup();
        await act(async () => render(<App />));
        const input = screen.getByRole("textbox");
        await user.type(input, searchTerm as string);
        await waitFor(
          () => {
            expect(
              screen.getByText(`Hotels (${numHotels})`),
            ).toBeInTheDocument();
            expect(
              screen.getByText(`Countries (${numCountries})`),
            ).toBeInTheDocument();
            expect(
              screen.getByText(`Cities (${numCities})`),
            ).toBeInTheDocument();

            if (numHotels == 0)
              expect(screen.getByText("No hotels found")).toBeInTheDocument();
            if (numCountries == 0)
              expect(
                screen.getByText("No countries found"),
              ).toBeInTheDocument();
            if (numCities == 0)
              expect(screen.getByText("No cities found")).toBeInTheDocument();
          },
          { timeout: 501 },
        );
      },
    );
  });
});
