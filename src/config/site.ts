import { centsToFomattedDollars } from "@/lib/utils";

const values = {
  name: "Rolling Oaks Daylilies",
  shipping: {
    baseNumItems: 3,
    baseCents: 1500,
    addItemCents: 150,
  },
  minimumOrderCents: 2000,
  email: "kaymcline@gmail.com",
  squareLogoKey: "/daylily-catalog/3/qfzgfclzjt1lwcxamlhe",
};

export const siteConfig = {
  name: values.name,
  description:
    "My catalog includes over 1,000 varieties in many forms. Spiders, unusual, doubles and unique forms. Double and white daylily specialist. AHS Display Garden.",
  url: "https://rollingoaksdaylilies.com",
  ogImage: "https://placehold.co/600x400",
  squareLogoKey: values.squareLogoKey,
  links: {
    facebook: "https://www.facebook.com/Rollingoaksdaylilies/",
  },
  content: {
    sections: [
      {
        title: values.name,
        subTitle:
          "Shop Our Stunning Collection of Named Daylilies and Seedlings.",
        text: "Welcome to Rolling Oaks Daylilies, where you'll find a stunning collection of over 1000 named daylilies and unique seedlings. Our hybridizing focus is double and white daylilies, including a wide variety of forms like spiders and unusual doubles. As an AHS Display Garden, we pride ourselves on delivering the highest quality plants to our customers.",
      },
      {
        title: "Ordering",
        subTitle: null,
        text: `To order, simply choose your favorite daylilies and checkout with a minimum order of ${centsToFomattedDollars(
          values.minimumOrderCents,
        )}. Our list prices are for double fans, which sometimes share one root system and may have small dormant plants. For availability, contact us at ${
          values.email
        } before payment or inquire about our "display only" plants. We accept checks made payable to Kay Cline, PayPal payments, and Venmo (@Karen-Cline-13).`,
      },
      {
        title: "Shipping",
        subTitle: null,
        text: `We ship Priority Mail (USPS) every Monday or Tuesday to ensure delivery before the weekend. Shipping costs ${centsToFomattedDollars(
          values.shipping.baseCents,
        )} for up to ${
          values.shipping.baseNumItems
        } plants and ${centsToFomattedDollars(
          values.shipping.addItemCents,
        )} for each additional plant. Unfortunately, we do not ship to California or outside of the United States. Order now and experience the beauty of Rolling Oaks Daylilies in your own garden!`,
      },
    ],
  },
} as const;
