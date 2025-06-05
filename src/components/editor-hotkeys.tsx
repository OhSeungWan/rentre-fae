import { useEditor } from "@craftjs/core";
import { useEffect } from "react";

export const EditorHotkeys = () => {
  const { actions, query } = useEditor();

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isCopy = (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "c";
      const isPaste = (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "v";

      if (isCopy) {
        const ids = query.getEvent("selected").all();
        const serialized = ids.map((id) => query.node(id).toSerializedNode());
        try {
          await navigator.clipboard.writeText(JSON.stringify(serialized));
        } catch (err) {
          console.error("Copy failed", err);
        }
      }

      if (isPaste) {
        try {
          const text = await navigator.clipboard.readText();
          const data = JSON.parse(text);
          if (Array.isArray(data)) {
            data.forEach((sn: any) => {
              const node = query.parseSerializedNode(sn).toNode();
              actions.add(node, "ROOT");
            });
          }
        } catch (err) {
          console.error("Paste failed", err);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions, query]);

  return null;
};
