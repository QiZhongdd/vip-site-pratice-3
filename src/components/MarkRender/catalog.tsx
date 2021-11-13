import React, { FC, useEffect, useState } from "react";

type Topic = {
  level: string;
  value: string;
  nodeKey: string;
}[];

const Catalog: FC<{ update: number }> = (props) => {
  // console.log('md目录组件');
  const [topic, setTopic] = useState<Topic>([]);

  useEffect(() => {
    const markdownNavs = document.querySelectorAll(".artical-nav");
    const navs: Topic = [];
    ((markdownNavs as unknown) as HTMLElement[]).forEach(
      (item: HTMLElement) => {
        const level = item.getAttribute("data-level");
        if (Number(level) > 4) return;
        const value = item.textContent;
        const nodeKey = item.id;
        navs.push({ level, value, nodeKey });
      }
    );
    setTopic(navs);
  }, [props.update]);
  
  return (
    <>
      {topic.map((item) => (
        <a
          href={`#${item.nodeKey}`}
          key={item.nodeKey}
          className={`topic-h${item.level}`}
        >
          {item.value}
        </a>
      ))}
    </>
  );
};

export default React.memo(Catalog);
