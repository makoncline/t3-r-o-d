import { test, expect } from "@playwright/experimental-ct-react";
import { TestComponent } from "./TestComponent";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
  const component = await mount(<TestComponent />);
  await expect(component).toContainText("hello");
});
