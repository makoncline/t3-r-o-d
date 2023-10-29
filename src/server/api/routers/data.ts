import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { templateConfig } from "@/config/template";

const NUM_DISPLAY = 6;

export const dataRouter = createTRPCRouter({
  lists: publicProcedure.query(async ({ ctx }) => {
    const displayListingIds: number[] = [];

    const lists = await ctx.db.lists.findMany({
      where: { user_id: templateConfig.userId },
      select: {
        id: true,
        name: true,
        intro: true,
        _count: {
          select: {
            lilies: true,
          },
        },
        lilies: {
          select: {
            id: true,
            name: true,
            img_url: true,
          },
          where: {
            img_url: {
              isEmpty: false,
            },
            id: { notIn: displayListingIds },
          },
          orderBy: {
            created_at: "desc",
          },
          take: NUM_DISPLAY,
        },
      },
    });
    displayListingIds.push(
      ...lists.flatMap((list) => list.lilies).map((listing) => listing.id),
    );

    const forSaleListingsCountQuery = await ctx.db.lilies.aggregate({
      where: { user_id: templateConfig.userId, price: { not: null } },
      _count: true,
    });
    const forSaleListingsDisplayListings = await ctx.db.lilies.findMany({
      where: {
        user_id: templateConfig.userId,
        price: { not: null },
        img_url: {
          isEmpty: false,
        },
        id: { notIn: displayListingIds },
      },
      select: {
        id: true,
        name: true,
        img_url: true,
      },
      take: NUM_DISPLAY,
      orderBy: {
        created_at: "desc",
      },
    });
    displayListingIds.push(
      ...forSaleListingsDisplayListings.map((listing) => listing.id),
    );

    const allListingsCountQuery = await ctx.db.lilies.aggregate({
      where: { user_id: templateConfig.userId },
      _count: true,
    });
    const allListingsDisplayListings = await ctx.db.lilies.findMany({
      where: {
        user_id: templateConfig.userId,
        img_url: {
          isEmpty: false,
        },
        id: { notIn: displayListingIds },
      },
      select: {
        id: true,
        name: true,
        img_url: true,
      },
      take: NUM_DISPLAY,
      orderBy: {
        created_at: "desc",
      },
    });

    const listsData = [
      {
        name: "All Listings",
        count: allListingsCountQuery._count,
        description: `All ${templateConfig.name} listings`,
        displayListings: allListingsDisplayListings.map((listing) => ({
          id: listing.id,
          name: listing.name,
          imageUrl: listing.img_url[0],
        })),
      },
      {
        name: "For Sale",
        count: forSaleListingsCountQuery._count,
        description: `All ${templateConfig.name} listings for sale`,
        displayListings: forSaleListingsDisplayListings.map((listing) => ({
          id: listing.id,
          name: listing.name,
          imageUrl: listing.img_url[0],
        })),
      },
      ...lists
        .map((list) => ({
          name: list.name,
          count: list._count.lilies,
          description: list.intro,
          displayListings: list.lilies.map((listing) => ({
            id: listing.id,
            name: listing.name,
            imageUrl: listing.img_url[0],
          })),
        }))
        .sort((a, b) => b.count - a.count),
    ];
    return listsData;
  }),
});
