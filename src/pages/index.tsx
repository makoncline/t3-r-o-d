import { api } from "@/utils/api";
import { MarketingLayout } from "@/layouts/marketing-layout";
import Typography from "@/components/typography";
import { siteConfig } from "@/config/site";
import { SizedImage, ResponsiveImage } from "@/components/blur-image";
import { MessageForm } from "@/components/message-form";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MarketingLayout>
        <main className="flex min-h-screen flex-col">
          <div className="relative">
            <ResponsiveImage
              imageKey={siteConfig.squareLogoKey}
              alt={"hero image"}
              className="h-96 w-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/50">
              Welcome to
              <Typography.h1 className="text-primary-foreground">
                {siteConfig.content.hero.title}
              </Typography.h1>
              <Typography.lead className="text-muted-foreground">
                {siteConfig.content.hero.text}
              </Typography.lead>
            </div>
          </div>

          <div className="container flex flex-col gap-12 px-4 py-16 ">
            {siteConfig.content.sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Typography.h1>{section.title}</Typography.h1>
                <Typography.lead>{section.text}</Typography.lead>
              </div>
            ))}
          </div>
          <SizedImage
            imageKey={siteConfig.squareLogoKey}
            alt={"an alt"}
            width={300}
          />
          <MessageForm />
        </main>
      </MarketingLayout>
    </>
  );
}
