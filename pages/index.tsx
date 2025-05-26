import { Editor, Frame, Element } from "@craftjs/core";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

import { Viewport, RenderNode } from "../components/editor";
import { Container, Text } from "../components/selectors";
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
        <Editor
          resolver={{ ...ComponentsMap }}
          enabled={false}
          onRender={RenderNode}
        >
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
