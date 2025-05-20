import { UserComponent, useNode } from "@craftjs/core";
import Link from "next/link";
import { Route } from "next";
import React from "react";
import { BottomCtaBtnSettings } from "./BottomCtaButtonSettings";

type BottomCtaBtnProps = {
  url?: string;
  title?: string;
  buttonText?: string;
};

export const BottomCtaBtn: UserComponent<BottomCtaBtnProps> = ({
  url = "",
  buttonText = "CTA",
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(dom: HTMLDivElement | null) => dom && connect(dom)}
      className="fixed bottom-0 z-[11] flex w-full max-w-[600px] flex-col items-start justify-start"
    >
      <Link
        href={url as Route}
        className="flex flex-col items-start justify-start self-stretch border-t-1 border-[#e2e6ec] border-[solid] bg-[#fff] px-[16px] pb-[12px] pt-[10px]"
      >
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="flex flex-row items-center justify-start self-stretch">
            <div className="flex h-[50px] flex-1 flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(146.51deg,#5d7cf9_0%,#3531ff_100%)]">
              <div className="whitespace-nowrap text-[16px] font-bold leading-normal text-[#fff]">
                {buttonText || "제품 선택하고 최저가 비교하기"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

BottomCtaBtn.craft = {
  displayName: "BottomCtaBtn",
  props: {
    url: "/",
    title: "CTA 영역 타이틀",
    buttonText: "제품 선택하고 최저가 비교하기",
  },
  related: {
    toolbar: BottomCtaBtnSettings,
  },
};
