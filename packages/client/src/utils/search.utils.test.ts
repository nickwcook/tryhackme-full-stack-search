import { describe, it, expect } from "vitest";
import * as searchUtils from "utils/search.utils";

describe("search utils", () => {
  describe("fetchAndFilterHotels", () => {
    it("returns an array of hotels where chain name, hotel name, city or country include passed search term string", () => {
      const testCases = [
        {
          searchTerm: "spain",
          numResults: 2,
        },
        {
          searchTerm: "spain",
          numResults: 2,
        },
        {
          searchTerm: "dublin",
          numResults: 1,
        },
        {
          searchTerm: "resort",
          numResults: 1,
        },
      ];

      testCases.forEach(async ({ searchTerm, numResults }) => {
        const result = await searchUtils.fetchAndFilterHotels(searchTerm);
        expect(result.length).toEqual(numResults);
      });
    });
  });

  describe("fetchAndFilterCities", () => {
    it("returns an array of cities where name includes passed search term string", () => {
      const testCases = [
        {
          searchTerm: "la",
          numResults: 2,
        },
        {
          searchTerm: "malaga",
          numResults: 1,
        },
        {
          searchTerm: "auc",
          numResults: 1,
        },
        {
          searchTerm: "b",
          numResults: 2,
        },
      ];

      testCases.forEach(async ({ searchTerm, numResults }) => {
        const result = await searchUtils.fetchAndFilterCities(searchTerm);
        expect(result.length).toEqual(numResults);
      });
    });
  });

  describe("fetchAndFilterCountries", () => {
    it("returns an array of countries where name or ISO code include passed search term string", () => {
      const testCases = [
        {
          searchTerm: "b",
          numResults: 2,
        },
        {
          searchTerm: "bg",
          numResults: 1,
        },
        {
          searchTerm: "c",
          numResults: 1,
        },
        {
          searchTerm: "cl",
          numResults: 1,
        },
        {
          searchTerm: "e",
          numResults: 2,
        },
        {
          searchTerm: "l",
          numResults: 3,
        },
      ];

      testCases.forEach(async ({ searchTerm, numResults }) => {
        const result = await searchUtils.fetchAndFilterCountries(searchTerm);
        expect(result.length).toEqual(numResults);
      });
    });
  });
});
