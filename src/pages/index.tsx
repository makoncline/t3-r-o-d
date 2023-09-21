import { api } from "@/utils/api";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { Typography } from "@/components/typography";
import { templateConfig } from "@/config/template";
import { SizedImage, ResponsiveImage } from "@/components/blur-image";
import { MessageForm } from "@/components/message-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MarketingLayout>
        <main className="flex min-h-screen flex-col">
          <section className="relative w-full">
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
          </section>
          <div className="container flex flex-col gap-10 px-4 py-10 ">
            {templateConfig.content.sections.map((section, i) => (
              <div key={i} className="flex flex-col">
                <Typography.h2>{section.title}</Typography.h2>
                <Typography.lead>{section.text}</Typography.lead>
              </div>
            ))}
          </div>
          <Card className="mx-auto w-96">
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>
                I&apos;ll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MessageForm />
            </CardContent>
          </Card>
        </main>
      </MarketingLayout>
    </>
  );
}
