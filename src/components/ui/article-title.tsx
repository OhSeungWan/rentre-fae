// ArticleTitleContainer.tsx
import React from "react";
import { cn } from "@/lib/utils";

const ArticleTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex w-full flex-col items-start justify-start gap-[16px] p-[16px]",
      className
    )}
    {...props}
  />
));
ArticleTitle.displayName = "ArticleTitleContainer";

const ArticleTitleHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center gap-[10px] self-stretch px-[24px] py-0",
      className
    )}
    {...props}
  />
));
ArticleTitleHeader.displayName = "ArticleTitleHeader";

const ArticleTitleDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-[100px] border-t border-[#B1B9CC]", className)}
    // {...props}
  />
));

ArticleTitleDivider.displayName = "ArticleTitleDivider";
export { ArticleTitle, ArticleTitleHeader, ArticleTitleDivider };
