import { UserComponent, useNode } from "@craftjs/core";
import Link from "next/link";
import { Route } from "next";
import Image from "next/image";
import { CardItemSettings } from "./CardItemSettings";

type CardItemProps = {
  link?: string;
  imgSrc?: string;
  imgAlt?: string;
  brand?: string;
  productName?: string;
  badgeText?: string;
  expandImage?: boolean;
};

export const CardItem: UserComponent<CardItemProps> = ({
  link = "",
  imgSrc = "",
  imgAlt = "",
  brand = "브랜드",
  productName = "상품이름",
  badgeText = "배지",
  expandImage = "",
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <Link
      ref={(dom: HTMLAnchorElement | null) => {
        if (dom) connect(dom);
      }}
      href={link as Route}
      className="flex w-[calc((100%-20px)/2)] max-w-[154px] shrink-0 flex-col items-start justify-start gap-[10px]"
    >
      <div className="relative flex h-[154px] w-full items-center justify-center border border-[#e2e6ec] bg-white p-6 rounded-[8px]">
        {badgeText && (
          <div className="absolute left-0 top-0 z-10 flex items-center justify-center rounded-br-[8px] rounded-tl-[8px] bg-[#2c2c2c] px-2 py-0.5 text-white text-sm font-medium">
            {badgeText}
          </div>
        )}
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={100}
          height={100}
          className={expandImage ? "scale-125" : ""}
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="text-sm font-medium text-[#788093]">{brand}</div>
        <div className="text-base font-medium text-[#2c2c2c]">
          {productName}
        </div>
        <span className="text-xs font-bold text-[#788093]">바로가기</span>
      </div>
    </Link>
  );
};

CardItem.craft = {
  displayName: "CardItem",
  props: {
    link: "/",
    imgSrc: "/sample.jpg",
    imgAlt: "샘플 이미지",
    brand: "브랜드명",
    productName: "상품명",
    badgeText: "",
    expandImage: false,
  },
  related: {
    toolbar: CardItemSettings,
  },
};
