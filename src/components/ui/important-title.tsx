import { cn } from "@/lib/utils";
import React, { type HtmlHTMLAttributes } from "react";

export const ImportantTitle = React.forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex gap-13 items-center w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});
