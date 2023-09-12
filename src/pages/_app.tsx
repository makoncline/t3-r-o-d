import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/global.css";
import { RootLayout } from "@/layouts/root-layout";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
};

export default api.withTRPC(MyApp);
