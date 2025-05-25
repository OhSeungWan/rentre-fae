import { UserComponent, useEditor, useNode } from "@craftjs/core";
import { ComparisonTableRowSettings } from "./ComparisonTableRowSettings";

type ComparisonTableRowProps = {
  values?: string[];
  columnCount?: number;
};

export const ComparisonTableRow: UserComponent<ComparisonTableRowProps> = ({
  values = [],
}) => {
  const {
    connectors: { connect },
  } = useNode();

  const { parentId } = useNode((node) => ({ parentId: node.data.parent }));

  const { columnCount = 3 } = useEditor((state) => {
    const parentNode = state.nodes[parentId];
    return {
      columnCount: parentNode?.data?.props?.columnCount ?? 3,
    };
  });

  const filledColumns = Array.from(
    { length: columnCount },
    (_, i) => values[i] || ""
  );

  return (
    <tr
      ref={(dom) => {
        if (dom) connect(dom);
      }}
    >
      {filledColumns.map((val, index) => (
        <td
          key={index}
          className="border bg-white px-4 py-2 text-sm text-[#2c2c2c]"
        >
          {val}
        </td>
      ))}
    </tr>
  );
};

ComparisonTableRow.craft = {
  displayName: "ComparisonTableRow",
  props: { values: ["모델명", "BAS37-C", "CBT-QSB1041W"] },
  related: { toolbar: ComparisonTableRowSettings },
};
