// @ts-nocheck
import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useNode, Element, UserComponent } from "@craftjs/core";

import { cn } from "@/lib/utils"; // Tailwind Merge 유틸리티

// 1️⃣ 버튼 Variant 정의
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(146.51deg,#5d7cf9_0%,#3531ff_100%)] text-white",
        secondary: "bg-black text-white hover:bg-black/80",
        teritary:
          "bg-white text-[#5D7CF9] border border-[#5D7CF9] hover:bg-[#5D7CF9]/10",
        link: "border border-[#e2e6ec] bg-white text-[#5D7CF9] hover:underline",
      },
      size: {
        default: "h-12 px-4 text-base",
        sm: "h-10 px-3 text-sm",
        lg: "h-14 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// 2️⃣ ArrowRight 컴포넌트
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

// 3️⃣ ButtonProps 타입 확장
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  link?: string;
  buttonText?: string;
  targetBlank?: boolean;
  hasArrowButton?: boolean;
  asChild?: boolean;
}

// 4️⃣ Button 컴포넌트
export const Button: UserComponent<ButtonProps> & {
  meta: Record<string, any>;
} = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      link,
      buttonText = "Button",
      targetBlank = false,
      hasArrowButton,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const {
      connectors: { connect },
    } = useNode();

    const Comp = asChild ? Slot : link ? Link : "button";

    const content = (
      <>
        <Element
          is={Text}
          id="buttonText"
          canvas
          text={buttonText}
          textAlign="center"
          fontWeight="500"
          tagName="span"
          margin={["0", "0", "0", "0"]}
          color={
            variant === "teritary"
              ? { r: "93", g: "124", b: "249", a: "1" }
              : { r: "255", g: "255", b: "255", a: "1" }
          }
        />
        {variant !== "primary" && hasArrowButton && (
          <ArrowRight type={variant as "secondary" | "teritary"} />
        )}
      </>
    );

    return (
      <div
        ref={(dom: HTMLDivElement | null) => {
          if (dom) connect(dom);
        }}
        className="flex w-full shrink-0 flex-col items-start justify-start px-[24px] py-0"
      >
        <Comp
          href={link}
          target={targetBlank ? "_blank" : "_self"}
          className={cn(buttonVariants({ variant, size, className }), "gap-2")}
          ref={ref as any}
          {...props}
        >
          {content}
        </Comp>
      </div>
    );
  }
);

Button.displayName = "Button";
Button.meta = { category: "Button" };

export { buttonVariants };
