import React, { createContext, useContext, useState } from "react";
import { NodeTree } from "@craftjs/core";

interface ClipboardState {
  tree: NodeTree | null;
  setTree: (tree: NodeTree | null) => void;
}

const ClipboardContext = createContext<ClipboardState | undefined>(undefined);

export const ClipboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tree, setTree] = useState<NodeTree | null>(null);
  return (
    <ClipboardContext.Provider value={{ tree, setTree }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboard = () => {
  const ctx = useContext(ClipboardContext);
  if (!ctx) throw new Error("useClipboard must be used within ClipboardProvider");
  return ctx;
};
