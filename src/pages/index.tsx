import { api } from "@/utils/api";
import { MarketingLayout } from "@/layouts/marketing-layout";
import Typography from "@/components/typography";
import { siteConfig } from "@/config/site";
import { BlurUpImage } from "@/components/blur-image";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MarketingLayout>
        <main className="flex min-h-screen flex-col">
          <div className="container flex flex-col gap-12 px-4 py-16 ">
            <div className="flex flex-col gap-4">
              <Typography.h1>{siteConfig.name}</Typography.h1>
              <Typography.lead>
                Welcome to Rolling Oaks Daylilies, where you&apos;ll find a
                stunning collection of over 1000 named daylilies and unique
                seedlings. Our hybridizing focus is double and white daylilies,
                including a wide variety of forms like spiders and unusual
                doubles. As an AHS Display Garden, we pride ourselves on
                delivering the highest quality plants to our customers.
              </Typography.lead>
            </div>
            <BlurUpImage
              imageKey={siteConfig.squareLogoKey}
              alt={"an alt"}
              width={300}
            />
          </div>
        </main>
      </MarketingLayout>
    </>
  );
}
