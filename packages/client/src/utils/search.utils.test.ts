import { describe, it, expect } from "vitest";
import * as searchUtils from "utils/search.utils";

describe("search utils", () => {
  describe("fetchAndFilterHotels", () => {
    const cases = [
      ["spain", 2],
      ["no chain", 2],
      ["dublin", 1],
      ["resort", 1],
      ["null", 0],
    ];
    it.each(cases)(
      "returns an array of hotels where chain name, hotel name, city or country include passed search term string",
      async (searchTerm, numResults) => {
        const result = await searchUtils.fetchAndFilterHotels(
          searchTerm.toString(),
        );
        expect(result.length).toEqual(numResults);
      },
    );
  });

  describe("fetchAndFilterCities", () => {
    const cases = [
      ["la", 2],
      ["malaga", 1],
      ["auc", 1],
      ["b", 2],
      ["null", 0],
    ];
    it.each(cases)(
      "returns an array of cities where name includes passed search term string",
      async (searchTerm, numResults) => {
        const result = await searchUtils.fetchAndFilterCities(
          searchTerm.toString(),
        );
        expect(result.length).toEqual(numResults);
      },
    );
  });

  describe("fetchAndFilterCountries", () => {
    const cases = [
      ["b", 2],
      ["bg", 1],
      ["c", 1],
      ["cl", 1],
      ["e", 2],
      ["l", 3],
      ["null", 0],
    ];
    it.each(cases)(
      "returns an array of countries where name or ISO code include passed search term string",
      async (searchTerm, numResults) => {
        const result = await searchUtils.fetchAndFilterCountries(
          searchTerm.toString(),
        );
        expect(result.length).toEqual(numResults);
      },
    );
  });
});
