import React from "react";
import { cn } from "@/lib/utils";

export interface ComparisonTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  values?: string[];
  columnCount?: number;
}

export const ComparisonTableRow = React.forwardRef<HTMLTableRowElement, ComparisonTableRowProps>(
  ({ values = [], columnCount = 3, className, ...props }, ref) => {
    const filled = Array.from({ length: columnCount }, (_, i) => values[i] || "");
    return (
      <tr ref={ref} className={cn(className)} {...props}>
        {filled.map((val, index) => (
          <td key={index} className="border bg-white px-4 py-2 text-sm text-[#2c2c2c]">
            {val}
          </td>
        ))}
      </tr>
    );
  }
);
ComparisonTableRow.displayName = "ComparisonTableRow";
