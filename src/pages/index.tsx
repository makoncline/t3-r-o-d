import { api } from "@/utils/api";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { Typography } from "@/components/typography";
import { templateConfig } from "@/config/template";
import { SizedImage, ResponsiveImage } from "@/components/blur-image";
import { MessageForm } from "@/components/message-form";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MarketingLayout>
        <main className="flex min-h-screen flex-col">
          <div className="relative w-full">
            <ResponsiveImage
              imageKey={templateConfig.squareLogoKey}
              alt={"hero image"}
              className="h-96 w-full"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 bg-gradient-to-tr from-background from-30% px-4 py-4 backdrop-blur-sm">
              <Typography.h3 asChild>
                <p>Welcome to</p>
              </Typography.h3>
              <Typography.h1 className="">
                {templateConfig.content.hero.title}
              </Typography.h1>
            </div>
          </div>
          <div className="container flex flex-col gap-12 px-4 py-16 ">
            {templateConfig.content.sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Typography.h2>{section.title}</Typography.h2>
                <Typography.lead>{section.text}</Typography.lead>
              </div>
            ))}
          </div>
          <SizedImage
            imageKey={templateConfig.squareLogoKey}
            alt={"an alt"}
            width={300}
          />
          <MessageForm />
        </main>
      </MarketingLayout>
    </>
  );
}
