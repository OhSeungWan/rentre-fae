import React from "react";
import { cn } from "@/lib/utils";

export interface ComparisonTableHeaderProps extends React.HTMLAttributes<HTMLTableRowElement> {
  columns?: string[];
  columnCount?: number;
}

export const ComparisonTableHeader = React.forwardRef<HTMLTableRowElement, ComparisonTableHeaderProps>(
  ({ columns = [], columnCount = 3, className, ...props }, ref) => {
    const filledColumns = Array.from({ length: columnCount }, (_, i) => columns[i] || "");
    return (
      <tr ref={ref} className={cn(className)} {...props}>
        {filledColumns.map((col, index) => (
          <th key={index} className="border bg-[#f7fbff] px-4 py-2 text-sm font-bold text-[#586177]">
            {col}
          </th>
        ))}
      </tr>
    );
  }
);
ComparisonTableHeader.displayName = "ComparisonTableHeader";
