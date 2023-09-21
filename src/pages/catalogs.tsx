import { Typography } from "@/components/typography";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { api } from "@/utils/api";
import Image from "next/image";

const CatalogsPage = () => {
  const { data } = api.data.lists.useQuery();
  return (
    <MarketingLayout>
      <main className="flex min-h-screen flex-col">
        <Typography.h1 className="pb-4">Catalogs</Typography.h1>
        {data?.map((list, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Typography.h2>{list.name}</Typography.h2>
                <Typography.lead>{list.description}</Typography.lead>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {list.displayListings.map((displayListing, i) => (
                    <div className={"w-[200px] space-y-3"} key={i}>
                      <div className="overflow-hidden rounded-md">
                        <div className="relative h-[266px] w-[200px]">
                          <Image
                            src={displayListing.imageUrl!}
                            alt={displayListing.name}
                            fill={true}
                            className=" object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <h3 className="font-medium leading-none">
                          {displayListing.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {displayListing.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        ))}
        {JSON.stringify(data)}
      </main>
    </MarketingLayout>
  );
};

export default CatalogsPage;
