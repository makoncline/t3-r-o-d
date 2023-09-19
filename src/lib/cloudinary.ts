import { env } from "@/env.mjs";
import { buildUrl } from "cloudinary-build-url";

const QUALITY = 100;
const BLUR_QUALITY = 1;
const BLUR_INTENSITY = 1000;
const FORMAT = "webp";

const baseOptions = {
  cloud: {
    cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};

export const toImageUrl = (key: string) =>
  buildUrl(key, {
    ...baseOptions,
    transformations: {
      quality: QUALITY,
      format: FORMAT,
    },
  });

export const toBlurImageUrl = (imageId: string) =>
  buildUrl(imageId, {
    ...baseOptions,
    transformations: {
      effect: { name: "blur", value: BLUR_INTENSITY },
      quality: BLUR_QUALITY,
      format: FORMAT,
    },
  });
