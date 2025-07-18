import { useEffect } from "react";
import { useEditor } from "@craftjs/core";

interface Props {
  json: string;
}

export const CraftPreviewRenderer = ({ json }: Props) => {
  const { actions } = useEditor();

  useEffect(() => {
    try {
      const first = JSON.parse(json); // ← 문자열 → 문자열
      const parsed = typeof first === "string" ? JSON.parse(first) : first;

      actions.deserialize(JSON.stringify(parsed));
    } catch (err) {
      console.error("❌ 역직렬화 실패:", err);
    }
  }, [json, actions]);

  return null;
};
