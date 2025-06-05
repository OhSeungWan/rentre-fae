import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
export const AutoHeightImage = React.forwardRef<
  HTMLDivElement,
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    isSafari?: boolean;
    containerClassName?: string;
    src: string;
    alt: string;
  }
>(({ className, isSafari, containerClassName, children, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      `relative w-full [&>img]:!relative [&>img]:!h-[auto] ${
        isSafari ? `[&>img]:!w-[auto]` : ""
      }`,
      containerClassName
    )}
  >
    <Image
      fill
      src={props.src}
      alt={props.alt}
      {...props}
      style={{ clipPath: "none" }}
    />
  </div>
));
