import React, { FC } from "react";
import HighCodelight from "react-highlight";
import "highlight.js/styles/atom-one-dark.css";
const Highlight: FC<{ language?: string; value: string }> = ({
  value,
  language,
}) => {
  // console.log("代码高亮组件");
  return <HighCodelight className={language}>{value}</HighCodelight>;
};
export default Highlight;
