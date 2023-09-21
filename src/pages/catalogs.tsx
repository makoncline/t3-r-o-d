import { Typography } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { templateConfig } from "@/config/template";
import { MarketingLayout } from "@/layouts/marketing-layout";
import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

const CatalogsPage = () => {
  const { data } = api.data.lists.useQuery();
  return (
    <MarketingLayout>
      <main className="container mx-auto flex min-h-screen max-w-2xl flex-col px-4">
        <Typography.h1 className="pb-4">Catalogs</Typography.h1>
        <Typography.muted className="text-lg">
          View catalogs by {templateConfig.name}
        </Typography.muted>
        <div className="space-y-6 pt-8">
          {data?.map((list, i) => (
            <section key={i}>
              <Card>
                <CardHeader className="items-start">
                  <CardTitle>{list.name}</CardTitle>
                  <CardDescription>{list.description}</CardDescription>
                  <Badge variant="secondary">
                    {list.count.toLocaleString()} listings
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4">
                        {list.displayListings.map((displayListing, i) => (
                          <div className={"w-[200px] space-y-3"} key={i}>
                            <div className="overflow-hidden rounded-md">
                              <div className="relative">
                                <Image
                                  src={displayListing.imageUrl!}
                                  alt={displayListing.name}
                                  width={200}
                                  height={266}
                                  className="h-[266px] w-[200px] object-cover"
                                />
                              </div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <Typography.large className="truncate">
                                {displayListing.name}
                              </Typography.large>
                              <Typography.muted className="truncate">
                                {displayListing.name}
                              </Typography.muted>
                            </div>
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" className="pt-2" />
                    </ScrollArea>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/catalog/${list.name}`}>View More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </section>
          ))}
        </div>
      </main>
    </MarketingLayout>
  );
};

export default CatalogsPage;
