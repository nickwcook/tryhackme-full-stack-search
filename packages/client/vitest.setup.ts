import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";
import React from "react";
import mockServer from "mocks/node";

global.React = React;

mockServer.listen();
beforeAll(() => {});

afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
