import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";

export type TextProps = {
  className?: string;
  text: string;

  tagName?: string;
};

export const Text = ({
  text,
  className,
  tagName = "h2",
}: Partial<TextProps>) => {
  return (
    <ContentEditable
      html={text} // innerHTML of the editable div
      disabled={true}
      onChange={() => {}}
      tagName={tagName} // Use a custom HTML tag (uses a div by default)
      className={className}
    />
  );
};
