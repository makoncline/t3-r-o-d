import { siteConfig } from "@/config/site";
import { type DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [],
    siteName: siteConfig.name,
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default config;
