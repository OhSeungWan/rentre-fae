// import { Editor, Frame, Element } from "@craftjs/core";
// import { createTheme, ThemeProvider } from "@mui/material";
// import React from "react";

// import { Viewport, RenderNode } from "../components/editor";
// import { Container, Text } from "../components/selectors";
// import { ComponentsMap } from "components/registry/ComponentsMap";

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       "acumin-pro",
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//     ].join(","),
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <div className="h-full h-screen">
//         {/* <NextSeo
//           title="Craft.js"
//           description="A React framework for building drag-n-drop page editors."
//           canonical="https://craft.js.org/"
//           twitter={{
//             site: 'craft.js.org',
//             cardType: 'summary_large_image',
//           }}
//         /> */}
//         <Editor
//           resolver={{ ...ComponentsMap }}
//           enabled={false}
//           onRender={RenderNode}
//         >
//           <Viewport>
//             <Frame>
//               <Element
//                 canvas
//                 is={Container}
//                 width="600px"
//                 height="auto"
//                 background={{ r: 255, g: 255, b: 255, a: 1 }}
//                 padding={["0", "0", "0", "0"]}
//                 alignItems="center"
//                 custom={{ displayName: "App" }}
//               >
//                 <Text text="안녕하세오~~~" margin={["10", "10", "10", "10"]} />
//               </Element>
//             </Frame>
//           </Viewport>
//         </Editor>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

import { Editor, Frame, Element } from "@craftjs/core";
import { SideMenu } from "@/components/side-menu";
import { Header } from "@/components/header";
import { Canvas } from "@/components/canvas";
import { NodeButton } from "@/components/node/button";
import {
  NodeCardHeader,
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardTitle,
  NodeCardFooter,
} from "@/components/node/card";
import { ReactIframe } from "@/components/react-iframe";
import { ControlPanel } from "@/components/control-panel";
import { Viewport } from "@/components/viewport";
import { RenderNode } from "@/components/render-node";
import { componentsMap } from "@/components/node/components-map";
import { NodeOneBlock, NodeTwoBlocks } from "@/components/node/layout";
import {
  NodeArticleTitle,
  NodeArticleTitleContainer,
  NodeArticleTitleDivider,
  NodeArticleTitleHeader,
  NodeArticleTitleMain,
  NodeArticleTitleSub,
  NodeArticleTitleText,
} from "@/components/node/article-title";
import { BenefitBgSectionContainer } from "@/components/ui/bg-section";
import {
  NodeBenefitBgSection,
  NodeBenefitBgSectionContainer,
  NodeBenefitBgSectionItem,
  NodeBenefitBgSectionTitle,
  NodeBgSectionContent,
} from "@/components/node/bg-section";

export default function Index() {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />
      <Editor
        resolver={{
          NodeButton,
          Canvas,
          NodeCardHeader,
          NodeCard,
          NodeCardContent,
          NodeCardDescription,
          NodeCardTitle,
          NodeCardFooter,
          NodeOneBlock,
          NodeTwoBlocks,
          NodeArticleTitle,
          NodeArticleTitleContainer,
          NodeArticleTitleDivider,
          NodeArticleTitleHeader,
          NodeArticleTitleMain,
          NodeArticleTitleSub,
          NodeArticleTitleText,
          NodeBenefitBgSectionContainer,
          NodeBenefitBgSectionItem,
          NodeBenefitBgSection,
          NodeBenefitBgSectionTitle,
          NodeBgSectionContent,
        }}
        onRender={RenderNode}
      >
        <div className="flex flex-1 relative overflow-hidden">
          <SideMenu componentsMap={componentsMap} />
          <Viewport>
            <ReactIframe
              title="my frame"
              className="p-64 w-full h-full page-container"
            >
              <Frame>
                <Element is={Canvas} id="ROOT" canvas>
                  <NodeButton>Button 1</NodeButton>
                  <NodeButton>Button 2</NodeButton>
                  <NodeButton>Button 3</NodeButton>
                  <NodeButton>Button 4</NodeButton>
                </Element>
              </Frame>
            </ReactIframe>
          </Viewport>

          <ControlPanel />
        </div>
      </Editor>
    </section>
  );
}
