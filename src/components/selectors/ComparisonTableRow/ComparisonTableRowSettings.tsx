import { ToolbarItem, ToolbarSection } from "@/components/editor";
import { useNode } from "@craftjs/core";

export const ComparisonTableRowSettings = () => {
  const {
    node: {
      data: { props },
    },
  } = useNode((node) => ({ node }));

  const { columnCount = 5 } = props;

  return (
    <>
      <ToolbarSection title="셀 값 설정">
        {[...Array(columnCount)].map((_, i) => (
          <ToolbarItem
            key={i}
            propKey="values"
            index={i}
            type="text"
            label={i === 0 ? `항목명` : `값 ${i}`}
          />
        ))}
      </ToolbarSection>
    </>
  );
};
