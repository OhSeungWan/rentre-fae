import { useEditor, useNode } from "@craftjs/core";
import { Code, Redo, Undo } from "lucide-react";
import React, { useState } from "react";

import { CodeView } from "./code-view";
import { DrawerTrigger, DrawerContent, Drawer } from "./ui/drawer";
import { getOutputCode, getOutputHTMLFromId } from "@/lib/code-gen";
import { NodeContainer } from "./node/container";

type CanvasProps = {
  children: React.ReactNode;
};

export const Canvas = ({ children }: CanvasProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const [canvasWidth, setCanvasWidth] = useState("w-[100%]");
  const { canUndo, canRedo, actions, query } = useEditor((_, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));
  const [output, setOutput] = useState<string | null>();

  const generateCode = () => {
    const { importString, output } = getOutputCode(query.getNodes());

    setOutput(`${importString}\n\n${output}`);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full flex justify-center">
      <div className={`${canvasWidth} flex flex-col h-full border rounded-sm`}>
        <div className="flex justify-between items-center p-4 w-full bg-gray-200">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-red-400"></div>
            <div className="h-8 w-8 rounded-full bg-yellow-400"></div>
            <div className="h-8 w-8 rounded-full bg-green-400"></div>
          </div>
          <div className="flex gap-2">
            <Drawer
              open={open}
              onOpenChange={(value: boolean) => {
                generateCode();
                setOpen(value);
              }}
            >
              <DrawerTrigger>
                <Code
                  size={24}
                  strokeWidth={1.75}
                  className="text-gray-500 hover:text-primary transition duration-300"
                />
              </DrawerTrigger>

              <DrawerContent className="h-[75vh]">
                <CodeView codeString={output as string} />
              </DrawerContent>
            </Drawer>
            {/* <Drawer
              open={htmlOpen}
              onOpenChange={(value: boolean) => {
                generateHTML();
                setHtmlOpen(value);
              }}
            >
              <DrawerTrigger>
                <FileCode2
                  size={24}
                  strokeWidth={1.75}
                  className="text-gray-500 hover:text-primary transition duration-300"
                />
              </DrawerTrigger>

              <DrawerContent className="h-[75vh]">
                <CodeView codeString={htmlOutput as string} />
              </DrawerContent>
            </Drawer> */}
          </div>

          <div className="flex items-center gap-2 opacity-80 active:text-primary">
            <div className="flex">
              <div className="w-32">
                {canUndo && (
                  <Undo
                    size={24}
                    strokeWidth={1.75}
                    className="text-gray-500 hover:text-primary transition duration-300"
                    onClick={(_) => {
                      actions.history.undo();
                    }}
                  />
                )}
              </div>
              <div className="w-32">
                {canRedo && (
                  <Redo
                    size={24}
                    strokeWidth={1.75}
                    className="text-gray-500 hover:text-primary transition duration-300"
                    onClick={(_) => {
                      actions.history.redo();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <NodeContainer
          className="w-full flex flex-col gap-32 flex-1 bg-white rounded-b-lg overflow-y-auto overflow-x-hidden"
          ref={(ref) => {
            if (ref) {
              connect(drag(ref));
            }
          }}
        >
          {children}
        </NodeContainer>
      </div>
    </div>
  );
};

Canvas.craft = {
  displayName: "Container",
  custom: {
    importPath: "@/components/ui/container",
  },
  props: {
    className:
      "w-full flex flex-col gap-32 flex-1 bg-white rounded-b-lg overflow-y-auto overflow-x-hidden",
  },
};
