import { useNode, useEditor } from "@craftjs/core";
import React, { useEffect } from "react";

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
  const { id } = useNode();
  const { query } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    isSelected,
    dom,
    moveable,
    connectors: { drag },
    parent,
    deletable,
    props,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    isSelected: node.events.selected,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  useEffect(() => {
    if (dom && id !== "ROOT") {
      if (isHover) {
        // If either active or hover, add corresponding classes

        dom.classList.toggle("component-hover", isHover);
      } else {
        // If neither active nor hover, remove both classes
        dom.classList.remove("component-hover");
      }
    }
  }, [dom, isHover]);

  useEffect(() => {
    if (dom && id !== "ROOT") {
      dom.classList.toggle("component-selected", isSelected);
    }
  }, [dom, isSelected]);

  return <>{render}</>;
};
