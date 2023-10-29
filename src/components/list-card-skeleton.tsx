import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const ListCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-5 w-1/6" />
      </CardHeader>
      <CardContent className="flex gap-4">
        <Skeleton className="h-52 w-1/3" />
        <Skeleton className="h-52 w-1/3" />
        <Skeleton className="h-52 w-1/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-[120px]" />
      </CardFooter>
    </Card>
  );
};
