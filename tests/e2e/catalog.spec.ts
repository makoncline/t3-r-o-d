import { expect, test } from "@playwright/test";
import sharp from "sharp";

test("home images and the catalog render through the migrated app", async ({ page }, testInfo) => {
  const image = await sharp({
    create: { width: 32, height: 32, channels: 3, background: "#6d9c44" },
  }).png().toBuffer();
  const scale = testInfo.project.use.deviceScaleFactor ?? 1;
  const responsiveImage = await sharp(image).resize(32 * scale, 32 * scale).png().toBuffer();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://res.cloudinary.com/**", (route) =>
    route.fulfill({ contentType: "image/png", body: image }),
  );
  await page.route("**/_next/image?*", async (route) => {
    const source = new URL(route.request().url()).searchParams.get("url");
    expect(source).toBe("https://daylily-catalog-images.s3.amazonaws.com/security-control.png");
    await route.fulfill({ contentType: "image/png", body: responsiveImage });
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Rolling Oaks Daylilies" })).toBeVisible();
  const logo = page.locator("img").first();
  await expect(logo).toHaveAttribute("src", /res\.cloudinary\.com/);
  await expect(logo).toHaveJSProperty("naturalWidth", 32);

  await page.goto("/catalogs");
  await expect(page.getByRole("heading", { level: 1, name: "Catalogs" })).toBeVisible();
  await expect(page.getByText("Security test catalog", { exact: true })).toBeVisible();
  const listingImage = page.getByRole("img", { name: "Security test daylily" }).first();
  await expect(listingImage).toBeVisible();
  await expect(listingImage).toHaveJSProperty("naturalWidth", 32);
  expect(errors).toEqual([]);
});
