import * as React from "react";
import { cn } from "@/lib/utils";

export type TypographyProps = React.AllHTMLAttributes<HTMLElement> & {
  asChild?: boolean;
};

const typographyTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "a",
  "blockquote",
  "pre",
  "code",
  "lead",
  "large",
  "small",
  "muted",
  "ul",
] as const;
type TypographyTag = (typeof typographyTags)[number];

const typographyStyles: Record<TypographyTag, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  a: "font-medium underline underline-offset-4",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  pre: "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
  ul: "my-6 ml-6 list-disc [&>li]:mt-2",
};

const withAsChild = (Tag: string, className: string) => {
  // eslint-disable-next-line react/display-name
  return React.forwardRef<HTMLElement, TypographyProps>(
    (
      { children: child, asChild, className: overrideClassName, ...props },
      ref,
    ) => {
      const newElementProps = {
        className: cn(className, overrideClassName),
        ref,
        ...props,
      };
      if (asChild && React.isValidElement(child)) {
        return React.cloneElement(child, newElementProps);
      }

      return React.createElement(Tag, newElementProps, child);
    },
  );
};

const Typography = {
  h1: withAsChild("h1", typographyStyles.h1),
  h2: withAsChild("h2", typographyStyles.h2),
  h3: withAsChild("h3", typographyStyles.h3),
  h4: withAsChild("h4", typographyStyles.h4),
  p: withAsChild("p", typographyStyles.p),
  a: withAsChild("a", typographyStyles.a),
  blockquote: withAsChild("blockquote", typographyStyles.blockquote),
  code: withAsChild("code", typographyStyles.code),
  lead: withAsChild("p", typographyStyles.lead),
  large: withAsChild("p", typographyStyles.large),
  small: withAsChild("p", typographyStyles.small),
  muted: withAsChild("p", typographyStyles.muted),
  ul: withAsChild("ul", typographyStyles.ul),
  pre: withAsChild("pre", typographyStyles.pre),
};

Typography.h1.displayName = "Typography.h1";
Typography.h2.displayName = "Typography.h2";
Typography.h3.displayName = "Typography.h3";
Typography.h4.displayName = "Typography.h4";
Typography.p.displayName = "Typography.p";
Typography.a.displayName = "Typography.a";
Typography.blockquote.displayName = "Typography.blockquote";
Typography.code.displayName = "Typography.code";
Typography.lead.displayName = "Typography.lead";
Typography.large.displayName = "Typography.large";
Typography.small.displayName = "Typography.small";
Typography.muted.displayName = "Typography.muted";
Typography.ul.displayName = "Typography.ul";
Typography.pre.displayName = "Typography.pre";

export { Typography };
