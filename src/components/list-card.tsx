import type { RouterOutputs } from "@/utils/api";
import { Typography } from "./typography";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

type ListCardProps = {
  list: RouterOutputs["data"]["lists"][number];
};
export const ListCard = ({ list }: ListCardProps) => {
  return (
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
                    <Image
                      src={displayListing.imageUrl!}
                      alt={displayListing.name}
                      width={200}
                      height={266}
                      className="h-[266px] w-[200px] object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <Typography.large className="truncate">
                      {displayListing.name}
                    </Typography.large>
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
  );
};
