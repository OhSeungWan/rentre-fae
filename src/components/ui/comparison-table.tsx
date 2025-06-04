import React from "react";
import { cn } from "@/lib/utils";
import { ComparisonTableHeader } from "./comparison-table-header";
import { ComparisonTableRow } from "./comparison-table-row";

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rowCount?: number;
  columnCount?: number;
}

export const ComparisonTable = React.forwardRef<HTMLDivElement, ComparisonTableProps>(
  ({ rowCount = 2, columnCount = 3, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("overflow-x-auto w-full px-6", className)} {...props}>
        <table className="w-max border-collapse">
          <thead>
            <ComparisonTableHeader columnCount={columnCount} />
          </thead>
          <tbody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <ComparisonTableRow key={i} columnCount={columnCount} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
ComparisonTable.displayName = "ComparisonTable";
