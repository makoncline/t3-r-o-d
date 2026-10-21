import { env } from "@/env.mjs";
import { Cloudinary } from "@cloudinary/url-gen";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { blur } from "@cloudinary/url-gen/actions/effect";

const QUALITY = 100;
const BLUR_QUALITY = 1;
const BLUR_INTENSITY = 1000;
const FORMAT = "webp";

const cloudinary = new Cloudinary({
  cloud: { cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: { secure: true, analytics: false, forceVersion: false },
});

export const toImageUrl = (key: string) =>
  cloudinary
    .image(key)
    .delivery(quality(QUALITY))
    .delivery(format(FORMAT))
    .toURL()
    .replaceAll("#", "%23");

export const toBlurImageUrl = (imageId: string) =>
  cloudinary
    .image(imageId)
    .effect(blur().strength(BLUR_INTENSITY))
    .delivery(quality(BLUR_QUALITY))
    .delivery(format(FORMAT))
    .toURL()
    .replaceAll("#", "%23");
