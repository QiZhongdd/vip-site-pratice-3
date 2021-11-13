import React, {
  useCallback,
  useEffect,
  FC,
  useState,
} from "react";

import "./pagination.css";

type PagiProps = {
  totalPage: number;
  onPrev?: (num: number) => void;
  onNext?: (num: number) => void;
  onCurrent?: (num: number) => void;
  curPage: number;
  isShow?: boolean;
};

const Pagination: FC<PagiProps> = ({
  totalPage,
  onPrev,
  onNext,
  onCurrent,
  curPage,
  isShow = false,
}) => {
  // console.log("页码组件");
  let [pageNum, setPageNum] = useState(curPage);
  // 拿到1，2，2 页数
  let pageNumArr = new Array(totalPage).fill(1).map((item, index) => index + 1);
  // 翻页处理
  let pageNumGap = 0;

  useEffect(() => {
    setPageNum(curPage);
  });
  const handlePrev = () => {
    if (pageNum <= 1) return;
    setPageNum(--pageNum);
    onPrev(pageNum);
  };
  const handleNext = () => {
    if (pageNum >= totalPage) return;
    setPageNum(++pageNum);
    onNext(pageNum);
  };
  const handlePageNumClick = useCallback((index: number) => {
    setPageNum(index);
    onCurrent(index);
  }, []);

  return (
    <div
      className="pagination layout-container"
      style={{ opacity: isShow ? 1 : 0 }}
    >
      <div
        onClick={handlePrev}
        className={`page-btn ${pageNum === 1 ? "disable" : ""}`}
      >
        上一页
      </div>

      <div className="page-numbers">
        {pageNumArr.map((item) => {
          // 数字翻页的计算
          if (pageNum > 8) {
            pageNumGap = pageNum - 8;
          }
          // 
          if (item === 1) {
            return (
              <div
                onClick={() => {
                  handlePageNumClick(item);
                }}
                key={item}
                className={`page-num ${item === pageNum ? "act" : ""}`}
              >
                {item}
              </div>
            );
          }

          // 是否显示点
          if (item === 2 && pageNum > 8) {
            return (
              <div
                onClick={() => {
                  handlePageNumClick(item);
                }}
                key={item}
                className={`page-num ${item === pageNum ? "act" : ""}`}
              >
                ...
              </div>
            );
          }

          // 如果pageNum 不超过，就不用显示
          if (item === 2 && pageNum <= 8) {
            return (
              <div
                onClick={() => {
                  handlePageNumClick(item);
                }}
                key={item}
                className={`page-num ${item === pageNum ? "act" : ""}`}
              >
                {item}
              </div>
            );
          }
          // ... 之间要显示的
          if (
            pageNum <= totalPage &&
            item > 2 + pageNumGap &&
            item <= 9 + pageNumGap
          ) {
            return (
              <div
                onClick={() => {
                  handlePageNumClick(item);
                }}
                className={`page-num ${item === pageNum ? "act" : ""}`}
                key={item}
              >
                {item}
              </div>
            );
          }
        })}
        {totalPage > 10 && pageNum <= totalPage - 3 ? (
          <div className="page-num">...</div>
        ) : (
          ""
        )}
        
        {totalPage > 10 && pageNum <= totalPage - 2 ? (
          <div
            onClick={() => {
              handlePageNumClick(totalPage);
            }}
            className={`page-num ${totalPage === pageNum ? "act" : ""}`}
          >
            {totalPage}
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        onClick={handleNext}
        className={`page-btn ${pageNum === totalPage ? "disable" : ""}`}
      >
        下一页
      </div>
    </div>
  );
};

export default React.memo(Pagination);
