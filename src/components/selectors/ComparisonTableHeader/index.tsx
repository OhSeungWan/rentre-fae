import { UserComponent, useEditor, useNode } from "@craftjs/core";
import { ComparisonTableHeaderSettings } from "./ComparisonTableHeaderSettings";

type ComparisonTableHeaderProps = {
  columns?: string[];
  columnCount?: number;
};

export const ComparisonTableHeader: UserComponent<
  ComparisonTableHeaderProps
> = ({ columns = [] }) => {
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
    (_, i) => columns[i] || ""
  );

  return (
    <tr
      ref={(dom) => {
        if (dom) connect(dom);
      }}
    >
      {filledColumns.map((col, index) => (
        <th
          key={index}
          className="border bg-[#f7fbff] px-4 py-2 text-sm font-bold text-[#586177]"
        >
          {col}
        </th>
      ))}
    </tr>
  );
};

ComparisonTableHeader.craft = {
  displayName: "ComparisonTableHeader",
  props: { columns: ["항목", "제품1", "제품2"] },
  related: { toolbar: ComparisonTableHeaderSettings },
};
