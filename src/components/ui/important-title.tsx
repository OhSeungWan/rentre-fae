import { cn } from "@/lib/utils";
import React, { type HtmlHTMLAttributes } from "react";

export const ImportantTitleContainer = React.forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex gap-13 items-center w-full", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
      >
        <circle cx="10.5742" cy="10" r="10" fill="#3531FF" />
        <path
          d="M6.69922 9.75L9.3078 12.3586C9.3859 12.4367 9.51254 12.4367 9.59064 12.3586L14.4492 7.5"
          stroke="white"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
      {children}
    </div>
  );
});
