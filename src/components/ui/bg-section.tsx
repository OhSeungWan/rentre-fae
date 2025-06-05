// ui/bg-section/BenefitBgSection.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const bgSectionVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        primary:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const BenefitBgSectionContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-[24px] flex w-full flex-col items-start justify-start gap-[16px] bg-[#E7EBFE] ",
      className
    )}
    {...props}
  />
));
BenefitBgSectionContainer.displayName = "BenefitBgSectionContainer";

export const BenefitBgSectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { number: string }
>(({ className, number = 1, children = "", ...props }, ref) => (
  <div
    className={cn(
      "flex flex-row items-center justify-center self-stretch",
      className
    )}
    {...props}
    ref={ref}
  >
    <div className="w-30 h-30 bg-black rounded-8 flex justify-center items-center">
      <span className="text-white text-16 font-bold">{number}</span>
    </div>
    <h3 className="whitespace-nowrap text-[22px] font-bold leading-[30px] text-[#2c2c2c]">
      {children}
    </h3>
  </div>
));
BenefitBgSectionTitle.displayName = "BenefitBgSectionTitle";

export const BenefitBgSectionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col self-stretch gap-[8px]", className)}
    {...props}
  />
));
BenefitBgSectionItem.displayName = "BenefitBgSectionItem";

export const BgSectionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex w-full flex-col items-start justify-start gap-[12px] self-stretch",
      className
    )}
    {...props}
  />
));
BgSectionContent.displayName = "BgSectionContent";
