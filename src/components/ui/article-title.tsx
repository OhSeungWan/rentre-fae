// ArticleTitleContainer.tsx
import React from "react";
import { cn } from "@/lib/utils";

const ArticleTitleContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full flex flex-col items-center justify-center",
      className
    )}
    {...props}
  />
));
ArticleTitleContainer.displayName = "ArticleTitleContainer";

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

const ArticleTitleMain = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "self-stretch whitespace-pre-line text-center text-[32px] font-bold leading-[38px] text-[#2c2c2c]",
      className
    )}
    {...props}
  />
));
ArticleTitleMain.displayName = "ArticleTitleMain";

const ArticleTitleSub = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[#2c2c2c] w-full whitespace-pre-line break-keep text-center leading-[28px] tracking-[-0.01em]",
      className
    )}
    {...props}
  />
));
ArticleTitleSub.displayName = "ArticleTitleSub";

const ArticleTitleText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "w-full whitespace-pre-line break-keep text-center text-[18px] leading-[24px] text-[#2c2c2c]",
      className
    )}
    {...props}
  />
));
ArticleTitleText.displayName = "ArticleTitleText";

const ArticleTitleDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-[100px] border-t border-[#B1B9CC]", className)}
    // {...props}
  />
));

ArticleTitleDivider.displayName = "ArticleTitleDivider";
export {
  ArticleTitleContainer,
  ArticleTitleHeader,
  ArticleTitleMain,
  ArticleTitleSub,
  ArticleTitleText,
  ArticleTitleDivider,
};
