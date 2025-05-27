import { Element, UserComponent, useNode } from "@craftjs/core";
import Link from "next/link";
import { Route } from "next";
import { ButtonSettings } from "./ButtonSettings";
import { Text } from "../Text";
import { Container } from "../Container";

type ButtonProps = {
  link?: string;
  type?: "primary" | "secondary" | "teritary" | "link";
  buttonText?: string;
  targetBlank?: boolean;
  hasArrowButton?: boolean;
};

const ArrowRight = ({ type }: { type: "secondary" | "teritary" }) => {
  return type === "secondary" ? (
    <svg
      width="9"
      height="17"
      viewBox="0 0 9 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.65088 4.32202L7.18503 8.85629C7.22408 8.89534 7.22408 8.95866 7.18503 8.99771L2.65088 13.5319"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="9"
      height="17"
      viewBox="0 0 9 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.10742 4.10547L6.64157 8.63974C6.68062 8.67879 6.68062 8.74211 6.64157 8.78116L2.10742 13.3153"
        stroke="#5D7CF9"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Button: UserComponent<ButtonProps> & {
  meta: Record<string, any>;
} = ({
  link = "/",
  type = "primary",
  targetBlank = false,
  buttonText = "Button",
  hasArrowButton,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  const buttonStyle =
    type === "primary"
      ? "bg-[linear-gradient(146.51deg,#5d7cf9_0%,#3531ff_100%)] text-[#fff]"
      : type === "teritary"
      ? "bg-[#fff] text-[#5D7CF9] border-1 border-[#5D7CF9]"
      : "bg-[#000] text-[#fff]";

  return (
    <div
      ref={(dom: HTMLDivElement | null) => {
        if (dom) {
          connect(dom);
        }
      }}
      className="flex w-full shrink-0 flex-col items-start justify-start px-[24px] py-0"
    >
      {type !== "link" ? (
        <Element is={Container} canvas id="button-container">
          <Link
            href={link as Route}
            className={`flex h-[50px] shrink-0 flex-row items-center justify-center gap-[9px] self-stretch rounded-[8px] px-[16px] py-0 text-center text-[16px] font-bold leading-normal ${buttonStyle}`}
          >
            <Element
              is={Text}
              id="buttonText"
              canvas
              text={buttonText}
              textAlign="center"
              fontWeight="500"
              tagName="span"
              color={{ r: "255", g: "255", b: "255", a: "1" }}
              margin={["0", "0", "0", "0"]}
            />
            {type !== "primary" && hasArrowButton && <ArrowRight type={type} />}
          </Link>
        </Element>
      ) : (
        <Link
          href={link as Route}
          target={targetBlank ? "_blank" : "_self"}
          className="flex flex-row items-center justify-center rounded-[8px] border-[1px] border-solid border-[#e2e6ec] bg-[#fff] px-[12px] py-[6px]"
        >
          <div className="whitespace-nowrap text-[14px] font-bold leading-[130%] text-[#5d7cf9]">
            🔗
            <span className="underline">
              <Element
                is={Text}
                id="buttonText"
                canvas
                text={buttonText}
                textAlign="center"
                fontWeight="500"
                tagName="span"
                color={{ r: "93", g: "124", b: "249", a: "1" }}
                margin={["0", "0", "0", "0"]}
              />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

// Craft 설정
Button.craft = {
  displayName: "Button",
  props: {
    link: "/",
    type: "primary",
    targetBlank: false,
    buttonText: "버튼",
    hasArrowButton: false,
  },
  related: {
    toolbar: ButtonSettings,
  },
  rules: {
    canMoveOut: () => true,
  },
};

Button.meta = {
  category: "Button",
};
