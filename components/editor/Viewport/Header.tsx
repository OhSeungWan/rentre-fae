import { useEditor } from "@craftjs/core";
import { Tooltip } from "@mui/material";
// import { Tooltip } from "@mui/material";
import cx from "classnames";
import React from "react";
import { styled } from "styled-components";

// import Checkmark from '../../../public/icons/check.svg';
// import Customize from '../../../public/icons/customize.svg';
// import RedoSvg from '../../../public/icons/toolbox/redo.svg';
// import UndoSvg from '../../../public/icons/toolbox/undo.svg';

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  background: #d4d4d4;
  display: flex;
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: #fff;
    opacity: 0.9;
  }
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Header = () => {
  const { enabled, canUndo, canRedo, actions, query } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  );

  const handlePublish = async () => {
    const slug = prompt("퍼블리싱될 슬러그를 입력하세요"); // 예: "air-purifier-1"
    const editorState = query.serialize();

    const res = await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, data: editorState }),
    });

    const json = await res.json();
    if (res.ok) {
      alert(`PR 생성 완료!\n${json.prUrl}`);
    } else {
      alert(`오류 발생: ${json.error}`);
    }
  };

  return (
    <HeaderDiv className="header text-white transition w-full">
      <div className="items-center flex w-full px-4 justify-end">
        {enabled && (
          <div className="flex-1 flex">
            <Tooltip title="Undo" placement="bottom">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                {"<"}
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                {">"}
              </Item>
            </Tooltip>
          </div>
        )}
        <div className="flex gap-16">
          <Btn
            className={cx([
              "transition cursor-pointer",
              {
                "bg-green-400": enabled,
                "bg-primary": !enabled,
              },
            ])}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {/* {enabled ? (
              <Checkmark viewBox="-3 -3 20 20" />
            ) : (
              <Customize viewBox="2 0 16 16" />
            )} */}
            {enabled ? "편집 완료하기" : "편집 계속하기"}
          </Btn>
          {!enabled && (
            <Btn
              className={cx([
                "transition cursor-pointer",
                { "bg-green-400": enabled, "bg-primary": !enabled },
              ])}
              onClick={handlePublish}
            >
              개발자 검수 요청
            </Btn>
          )}
        </div>
      </div>
    </HeaderDiv>
  );
};
