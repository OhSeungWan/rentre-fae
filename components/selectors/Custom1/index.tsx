import { Element, useNode } from "@craftjs/core";
import React from "react";

import { Button } from "../Button";
import { Container } from "../Container";
import { BgSection } from "../BgSection";
import { CardList } from "../CardList";

export const OnlyButtons = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      title="only-buttons"
      ref={(dom) => {
        connect(dom);
      }}
      className="w-full mt-5"
      {...props}
    >
      {children}
    </div>
  );
};

OnlyButtons.craft = {
  rules: {
    canMoveIn: (nodes) => nodes.every((node) => node.data.type === Button),
  },
};

export const Custom1 = (props: any) => {
  return (
    <Container {...props}>
      <h2 className="text-lg px-10 py-5 text-white">
        I'm a component that only accepts
        <br /> buttons.
      </h2>
      <Element canvas id="wow" is={OnlyButtons}>
        <Button />
        <Button />
        <BgSection contentList={["first", "second"]} />
        <CardList
          list={[
            {
              link: "/",
              imgSrc: "/sample.jpg",
              imgAlt: "샘플 이미지",
              brand: "브랜드명",
              productName: "상품명",
            },
          ]}
        />
      </Element>
    </Container>
  );
};

Custom1.craft = {
  ...Container.craft,
  displayName: "Custom 1",
};
