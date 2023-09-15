import { test } from "vitest";
import { centsToFomattedDollars } from "../../src/lib/utils";

test("converts cents to dollars correctly", () => {
  const result = centsToFomattedDollars(100);
  if (result !== "$1.00") throw new Error(`Expected $1.00, got ${result}`);
});

test("handles zero cents correctly", () => {
  const result = centsToFomattedDollars(0);
  if (result !== "$0.00") throw new Error(`Expected $0.00, got ${result}`);
});

test("handles negative cents correctly", () => {
  const result = centsToFomattedDollars(-100);
  if (result !== "-$1.00") throw new Error(`Expected -$1.00, got ${result}`);
});
