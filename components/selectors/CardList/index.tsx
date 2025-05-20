import { UserComponent, useNode, Element } from "@craftjs/core";

import { CardListSettings } from "./CardListSettings";
import { CardItem } from "../CardItem";
import { Container } from "../Container";

type CardListProps = {
  backgroundColor?: string;
};

export const CardList: UserComponent<CardListProps> = () => {
  return (
    <Container
      alignItems="center"
      flexDirection="column"
      padding={["16", "0", "16", "0"]}
      className="flex flex-col gap-6"
    >
      <Element
        is={Container}
        canvas
        id="ct-1"
        className="flex gap-6"
        flexDirection="row"
        justifyContent="center"
      >
        <Element is={CardItem} canvas id="first" />
        <Element is={CardItem} canvas id="second" />
      </Element>
      <Element
        is={Container}
        canvas
        id="ct-2"
        className="flex gap-6"
        flexDirection="row"
        justifyContent="center"
      >
        <Element is={CardItem} canvas id="first" />
        <Element is={CardItem} canvas id="second" />
      </Element>
      {/* <Container alignItems="center" flexDirection="row">
        <Element is={CardItem} canvas id="first" />
        <Element is={CardItem} canvas id="second" />
      </Container> */}
    </Container>
  );
};

CardList.craft = {
  displayName: "CardList",
  props: {
    backgroundColor: "#ffffff",
  },
  related: {
    toolbar: CardListSettings,
  },
};
