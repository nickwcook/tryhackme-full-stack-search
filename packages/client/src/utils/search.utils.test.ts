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
});
