import { UserComponent, useNode } from "@craftjs/core";
import Link from "next/link";
import Image from "next/image";
import { Route } from "next";
import { StoryItemSettings } from "./StoryItemSettings";

type StoryItemProps = {
  imgSrc?: string;
  title?: string;
  subTitle?: string;
  linkUrl?: string;
  bg?: string;
};

export const StoryItem: UserComponent<StoryItemProps> = ({
  imgSrc = "",
  title = "스토리 아이템",
  subTitle = "스토리 아이템",
  linkUrl = "",
  bg,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <Link
      ref={(dom: HTMLAnchorElement | null) => {
        if (dom) connect(dom);
      }}
      href={linkUrl as Route}
      className="flex w-full gap-12"
    >
      <div
        className={`relative h-[93px] w-[140px] flex-shrink-0 rounded-8 ${
          bg || ""
        }`}
      >
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="rounded-8 object-cover"
        />
      </div>
      <div className="flex flex-col gap-12">
        <h4 className="text-18 font-bold leading-normal text-[#2C2C2C]">
          {title}
        </h4>
        <p className="text-14 font-medium leading-normal text-[#788093]">
          {subTitle}
        </p>
      </div>
    </Link>
  );
};

StoryItem.craft = {
  displayName: "StoryItem",
  props: {
    imgSrc: "/sample.jpg",
    title: "기본 타이틀",
    subTitle: "기본 서브타이틀",
    linkUrl: "/",
    bg: "",
  },
  related: {
    toolbar: StoryItemSettings,
  },
};
