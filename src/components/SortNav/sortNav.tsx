import React, {
  FC,
  ReactNode,
  useRef,
  MouseEvent,
  useState,
  useCallback,
} from "react";
import "./sortNav.css";

type Props = {
  children?: ReactNode;
  navItems: { id: number; name: string }[];
  curItem?: (id: number) => void;
  curItemId?: number;
};
const SortNav: FC<Props> = (props) => {
  // console.log('题目导航组件');
  const { navItems = [], curItem, curItemId } = props,
    liDom = useRef<HTMLLIElement>(null!),
    [curId, setCurId] = useState<number>(curItemId),
    handleItemClick = useCallback((event: MouseEvent<HTMLLIElement>): void => {
      const curId = Number(event.currentTarget.dataset.id || 0);
      setCurId(curId);
      curItem(curId);
    }, []);
  return (
    <ul className="sort-nav-box layout-container">
      {navItems.map((item) => (
        <li
          ref={liDom}
          className={`${curId === item.id ? "item-act" : ""}`}
          onClick={handleItemClick}
          key={item.id}
          data-id={item.id}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
export default React.memo(SortNav);
