// ui/bg-section/BenefitBgSection.tsx
import React from "react";
import { cn } from "@/lib/utils";

export const BenefitBgSection = React.forwardRef<
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
BenefitBgSection.displayName = "BenefitBgSectionContainer";
