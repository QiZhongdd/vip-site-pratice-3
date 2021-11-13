import React, { FC, ReactNode, useEffect } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
// 实现高亮与标题处理
import Highlight from "./highlight";
import HeadBlock from "./headBlock";
import Catalog from "./catalog";


import "./m-theme.css";
import "./markRender.css";

import { useViewport } from "@hooks/index";

const MarkRender: FC<{
  mardownStr: string;
  showTopic?: boolean;
  setHeight?: boolean;
  heightGap?: number;
  opaicty?: number;
}> = (props) => {
  // console.log("md渲染组件");
  const {
    mardownStr,
    showTopic = true,
    setHeight = true,
    heightGap = 83,
    opaicty = 1,
  } = props;
  const { wh } = useViewport();
  // let markdownSource = mardownStr.replace(/↵/g, "\n");
  let markdownSource = mardownStr;
  return mardownStr ? (
    <div
      className="markdown-box"
      style={{
        height: setHeight ? wh - 80 - heightGap + "px" : "unset",
        opacity: opaicty,
      }}
    >
      {showTopic ? (
        <div className="topic">
          <Catalog update={Date.now()}></Catalog>
        </div>
      ) : (
        ""
      )}
      <div className="content" style={{ flex: showTopic ? 0.78 : 1 }}>
        <Markdown
          plugins={[gfm]}
          linkTarget='_blank'
          renderers={{
            heading: HeadBlock,
            code: Highlight,
          }}
        >
          {markdownSource}
        </Markdown>
      </div>
    </div>
  ) : // <div className="loading-tip">资源正在加载中</div>
  null;
};
export default React.memo(MarkRender);
