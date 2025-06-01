import { UserComponent, useNode, Element } from "@craftjs/core";

import { CardListSettings } from "./CardListSettings";
import { CardItem } from "../CardItem";
import { Container } from "../Container";

type CardListProps = {
  backgroundColor?: string;
};

const CardListContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Element is={Container} canvas id="card-list-container">
      {children}
    </Element>
  );
};

export const CardList: UserComponent<CardListProps> = () => {
  return (
    <CardListContainer>
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
    </CardListContainer>
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
