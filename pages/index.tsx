import { Editor, Frame, Element } from "@craftjs/core";
import { createTheme, ThemeProvider } from "@mui/material";
import { NextSeo } from "next-seo";
import React from "react";

import { Viewport, RenderNode } from "../components/editor";
import { Container, Text } from "../components/selectors";
import { Button } from "../components/selectors/Button";
import { Custom1, OnlyButtons } from "../components/selectors/Custom1";
import { Custom2, Custom2VideoDrop } from "../components/selectors/Custom2";
import { Custom3, Custom3BtnDrop } from "../components/selectors/Custom3";
import { Video } from "../components/selectors/Video";
import { ArticleTitle } from "components/selectors/ArticleTitle";
import { BgSection } from "components/selectors/BgSection";
import { CardList } from "components/selectors/CardList";
import { StoryItem } from "components/selectors/StoryItem";
import { StoryList } from "components/selectors/StoryList";
import { BottomCtaButton } from "components/selectors/BottomCtaButton";
import { Footer } from "components/selectors/Footer";
import { SectionTitle } from "components/selectors/SectionTitle";
import { CardItem } from "components/selectors/CardItem";
import { ComponentsMap } from "components/registry/ComponentsMap";

const theme = createTheme({
  typography: {
    fontFamily: [
      "acumin-pro",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        {/* <NextSeo
          title="Craft.js"
          description="A React framework for building drag-n-drop page editors."
          canonical="https://craft.js.org/"
          twitter={{
            site: 'craft.js.org',
            cardType: 'summary_large_image',
          }}
        /> */}
        <Editor resolver={ComponentsMap} enabled={false} onRender={RenderNode}>
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width="600px"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={["0", "0", "0", "0"]}
                alignItems="center"
                custom={{ displayName: "App" }}
              >
                <Text text="안녕하세오~~~" margin={["10", "10", "10", "10"]} />
              </Element>
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default App;
