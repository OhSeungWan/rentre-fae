import { useEditor } from "@craftjs/core";
import { useEffect, useRef } from "react";

export const useDraftStorage = (key: string = "craft-draft") => {
  const { query, actions } = useEditor();
  const lastRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        actions.deserialize(JSON.parse(stored));
        lastRef.current = stored;
      }
    } catch (err) {
      console.error("Failed to load draft", err);
    }
  }, [key, actions]);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const serialized = query.serialize();
        if (serialized !== lastRef.current) {
          localStorage.setItem(key, serialized);
          lastRef.current = serialized;
        }
      } catch (err) {
        console.error("Failed to save draft", err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [key, query]);
};
