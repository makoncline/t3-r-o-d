import { ListCard } from "@/components/list-card";
import { ListCardSkeleton } from "@/components/list-card-skeleton";
import { Typography } from "@/components/typography";
import { templateConfig } from "@/config/template";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { appRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { db } from "@/server/db";

const CatalogsPage = () => {
  const { data, status } = api.data.lists.useQuery();
  const renderListCards = () => {
    if (status === "loading") return <ListCardSkeleton />;
    return data?.map((list, i) => (
      <section key={i}>
        <ListCard list={list} />
      </section>
    ));
  };
  return (
    <MarketingLayout>
      <main className="container mx-auto flex min-h-screen max-w-2xl flex-col px-4">
        <Typography.h1 className="pb-4">Catalogs</Typography.h1>
        <Typography.muted className="text-lg">
          View catalogs by {templateConfig.name}
        </Typography.muted>
        <div className="space-y-6 pt-8">{renderListCards()}</div>
      </main>
    </MarketingLayout>
  );
};

export default CatalogsPage;

export async function getStaticProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { db },
    transformer: superjson,
  });
  await helpers.data.lists.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 60 * 1, // 1 minute
  };
}
