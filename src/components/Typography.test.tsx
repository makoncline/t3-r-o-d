import { Typography } from "@/components/typography";
import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

test("renders h1 tag correctly", () => {
  render(<Typography.h1>Hello</Typography.h1>);
  const h1Element = screen.getByText("Hello");
  expect(h1Element.tagName).toBe("H1");
});

test("forwards props correctly", () => {
  render(<Typography.h1 id="test-id">Hello</Typography.h1>);
  const h1Element = screen.getByText("Hello");
  expect(h1Element.id).toBe("test-id");
});

test("replaces tag when asChild is true", () => {
  render(
    <Typography.h1 asChild>
      <p>Hello</p>
    </Typography.h1>,
  );
  const pElement = screen.getByText("Hello");
  expect(pElement.tagName).toBe("P");
});

test("applies correct class names", () => {
  render(<Typography.h1>Hello</Typography.h1>);
  const h1Element = screen.getByText("Hello");
  expect(h1Element).toHaveClass(
    "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  );
});
