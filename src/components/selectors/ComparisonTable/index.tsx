import { UserComponent, useNode, Element } from "@craftjs/core";
import { ComparisonTableHeader } from "../ComparisonTableHeader";
import { ComparisonTableRow } from "../ComparisonTableRow";
import { ComparisonTableSettings } from "./ComparisonTableSettings";

type ComparisonTableProps = {
  rowCount: number;
  columnCount: number;
};

export const ComparisonTable: UserComponent<ComparisonTableProps> = ({
  rowCount = 2,
  columnCount = 5,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  console.log(rowCount, columnCount);

  return (
    <div
      ref={(dom) => {
        if (dom) {
          connect(dom);
        }
      }}
      className="overflow-x-auto w-full px-6"
    >
      <table className="w-max border-collapse">
        <thead>
          <Element
            is={ComparisonTableHeader}
            id="comparison-header"
            canvas
            columnCount={columnCount}
          />
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <Element
              is={ComparisonTableRow}
              id={`comparison-row-${i}`}
              key={i}
              canvas
              custom={{ columnCount }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ComparisonTable.craft = {
  displayName: "ComparisonTable",
  props: {
    rowCount: 2,
    columnCount: 5,
  },
  related: { toolbar: ComparisonTableSettings },
};
