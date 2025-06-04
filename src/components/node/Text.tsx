import { useNode, useEditor } from "@craftjs/core";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { SettingsControl } from "../settings-control";

export const NodeText = ({
  text = "텍스트를 입력하세요",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { text: string }) => {
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
      tagName={"p"} // Use a custom HTML tag (uses a div by default)
      {...props}
    />
  );
};

NodeText.craft = {
  displayName: "Text",
  props: {
    text: "텍스트를 입력하기",
  },
  related: {
    toolbar: SettingsControl,
  },
};
