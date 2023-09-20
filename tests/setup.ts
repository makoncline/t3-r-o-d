import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

afterEach(() => {
  cleanup();
});

expect.extend(matchers);
