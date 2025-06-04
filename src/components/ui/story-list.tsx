import React from "react";
import { cn } from "@/lib/utils";

export interface StoryListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
}

const StoryList = React.forwardRef<HTMLDivElement, StoryListProps>(
  ({ background, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-20", className)}
        style={{ background }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StoryList.displayName = "StoryList";

export { StoryList };
