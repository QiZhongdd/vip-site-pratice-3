import React, { createElement, FC, ReactElement } from "react";

const HeadBlock: FC<{ level: number; children: ReactElement[] }> = (props) => {
  const { level, children } = props;
  let nodeKey = '';
  children && children.forEach(item=>{
    nodeKey = item.props.nodeKey ? item.props.nodeKey : item.key;
  })
  return (
    <>
      {createElement(
        `h${level}`,
        { className: "artical-nav", id: nodeKey, "data-level": level },
        children
      )}
    </>
  );
};
export default React.memo(HeadBlock);
