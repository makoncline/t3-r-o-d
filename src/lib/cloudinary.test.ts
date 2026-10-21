import { expect, test } from "vitest";
import { toBlurImageUrl, toImageUrl } from "./cloudinary";

test("logo image IDs keep folders and encoded characters as asset data", () => {
  for (const id of ["/daylily-catalog/3/logo", "flowers/éclair 50%? #,photo"]) {
    const image = new URL(toImageUrl(id));
    expect(image.origin).toBe("https://res.cloudinary.com");
    expect(image.hash).toBe("");
    expect(image.search).toBe("");
    expect(decodeURIComponent(image.pathname)).toContain("/image/upload/q_100/f_webp/");
    expect(decodeURIComponent(image.pathname).endsWith(`/${id}`)).toBe(true);
  }
});

test("blur output keeps its own quality and effect across image calls", () => {
  const id = "flowers/photo";
  const first = toBlurImageUrl(id);
  toImageUrl("flowers/other");
  expect(toBlurImageUrl(id)).toBe(first);
  expect(first).toContain("/e_blur:1000/q_1/f_webp/flowers/photo");
});
