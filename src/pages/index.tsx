import { api } from "@/utils/api";
import { MarketingLayout } from "@/layouts/marketing-layout";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MarketingLayout>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            hello world
          </div>
        </main>
      </MarketingLayout>
    </>
  );
}
