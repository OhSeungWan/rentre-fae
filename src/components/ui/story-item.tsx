import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Route } from "next";
import { cn } from "@/lib/utils";

export interface StoryItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  imgSrc?: string;
  title?: string;
  subTitle?: string;
  linkUrl?: string;
  bg?: string;
}

const StoryItem = React.forwardRef<HTMLAnchorElement, StoryItemProps>(
  (
    {
      imgSrc = "",
      title = "",
      subTitle = "",
      linkUrl = "#",
      bg,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        href={linkUrl as Route}
        ref={ref}
        className={cn("flex w-full gap-12", className)}
        {...props}
      >
        <div
          className={cn(
            "relative h-[93px] w-[140px] flex-shrink-0 rounded-8",
            bg
          )}
        >
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="rounded-8 object-cover"
          />
        </div>
        <div className="flex flex-col gap-12">
          <h4 className="text-18 font-bold leading-normal text-[#2C2C2C]">
            {title}
          </h4>
          <p className="text-14 font-medium leading-normal text-[#788093]">
            {subTitle}
          </p>
        </div>
      </Link>
    );
  }
);
StoryItem.displayName = "StoryItem";

export { StoryItem };
