import { useNode, useEditor } from "@craftjs/core";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { SettingsControl } from "../settings-control";

export const NodeText = ({
  text = "텍스트를 입력하세요",
  tagName = "span",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  tagName?: string;
}) => {
  const {
    id,
    connectors: { connect, drag },
    setProp,
  } = useNode();
  const { isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    if (text !== localText) {
      setLocalText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const applyRef = (node: HTMLElement) => {
    if (node) {
      connect(drag(node));
      drag(node);
    }
  };
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      connect(drag(contentRef.current));
    }
  }, [connect, drag]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault(); // 기본 HTML 붙여넣기 방지
    const plainText = e.clipboardData.getData("text/plain");

    setProp((props) => {
      props.text = plainText;
    }, 500);
    setLocalText(plainText);
  };

  //   useEffect(() => {
  //   if (isActive) {
  //     editor.actions.select().clear();
  //     editor.actions.select().add(id); // Craft.js 편집 상태
  //     editor.actions.setEvent("editingTextId", id); // 추가! 편집 중 표시
  //   } else {
  //     const editingId = editor.query.getEvent("editingTextId");
  //     if (editingId === id) {
  //       editor.actions.setEvent("editingTextId", null); // 편집 종료
  //     }
  //   }
  // }, [isActive, id, editor.actions, editor.query]);
  return (
    <ContentEditable
      innerRef={contentRef}
      html={localText}
      disabled={!isActive}
      onChange={(e) => {
        setProp((prop) => {
          prop.text = e.target.value;
          setLocalText(e.target.value);
        }, 500);
      }} // use true to disable editing
      onPaste={handlePaste}
      tagName={tagName} // Use a custom HTML tag (uses a div by default)
      {...props}
    />
  );
};

(NodeText as any).craft = {
  ...(NodeText as any).craft,
  displayName: "Text",
  props: {
    text: "텍스트를 입력하기",
  },
  custom: {
    importPath: "@/components/ui/text",
  },
  related: {
    toolbar: SettingsControl,
  },
};
