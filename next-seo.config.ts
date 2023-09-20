import { templateConfig } from "@/config/template";
import { type DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: `%s | ${templateConfig.name}`,
  defaultTitle: templateConfig.name,
  description: templateConfig.description,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: templateConfig.url,
    title: templateConfig.name,
    description: templateConfig.description,
    images: [],
    siteName: templateConfig.name,
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default config;
