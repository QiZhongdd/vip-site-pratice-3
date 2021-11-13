import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";
import "./quesBank.css";
import { useHistory } from "react-router-dom";
// markdown 显示
import MarkRender from "@components/MarkRender/markRender";
// 分页
import Pagination from "@components/Pagination/pagination";
// 分类导航
import SortNav from "@components/SortNav/sortNav";

import { ques } from "@api/index";
import Loading from "@components/Loading/Loading";
// 自定义 hooks 检查是否登录有效
import { useLoginCheck } from "@hooks/index";
import { loginSel } from "@recoil/selectors/loginSelectors";
// 错误提示弹窗
import Totast from "@components/Totast/totast";
// recoil 状态
import {
  quesListSelect,
  quesSelect,
} from "@recoil/selectors/quesListSelectors";

import { useRecoilState, useRecoilValue } from "recoil";
// 简单的工具函数
import { scrollToAnchor } from "@utils/index";

const QuesBank: FC<{}> = () => {
  // console.log("面试题列表");
  const history = useHistory();
  const { setLoginStatus } = useLoginCheck();

  const { uid } = useRecoilValue(loginSel);

  const [listLoading, setListLoading] = useState(true);
  const [sortLoading, setSortLoading] = useState(true);

  const [quesListParam, setQuesListParam] = useRecoilState(quesListSelect);
  const quesListParams = useRef(quesListParam);
  // useRef变化不会主动使页面渲染
  // useRef接收initialValue作为初始值，它的返回值是一个ref对象，这个对象的.current属性就是该数据的最新值。使用useRef的一个最简单的情况就是在Function Component里面存储对DOM对象的引用，
  // 它可以保证在组件每次渲染的时候拿到的都是同一个对象。
  // useRef返回的ref object被重新赋值的时候不会引起组件的重渲染，如果你有这个需求的话请使用useState来存储数据。
  // useRef保存任何可变化的值，.current属性总是取最新的值。就是相当于全局作用域，一处被修改，其他地方全更新...
  quesListParams.current = quesListParam;

  const [num, setNum] = useState(0);

  const [quesParam, setQuesParam] = useRecoilState(quesSelect);
  const quesParams = useRef(quesParam);
  quesParams.current = quesParam;

  const [quesList, setQuesList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const totalPage = useRef(pageCount);
  totalPage.current = pageCount;

  const [navItems, setNavItems] = useState([]);
  const navItemsArr = useRef(navItems);
  navItemsArr.current = navItems;

  let _componentStatus = useRef(true);

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    return () => {
      _componentStatus.current = false;
    };
  }, []);

  useEffect(() => {
    document.querySelector(".page-ques").scrollTo(0, 0);
  }, [quesParam.curNav, quesListParam.page]);

  // 请求导航分类
  useEffect(() => {
    setSortLoading(true);
    ques
      .getQuesSort({ uid })
      .then((res) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        setLoginStatus(res.status);

        const navArr = res.data || [];
        setNavItems(navArr);
        setSortLoading(false);
      })
      .catch((err) => {
        setSortLoading(false);
        setIsError(true);
      });
  }, []);

  // 请求题目列表
  useEffect(() => {
    setListLoading(true);
    const { page, page_count } = quesListParam;
    const { curQuesIndex, quesList, curQid } = quesParam;
    ques
      .getQuesList({ ...quesListParam, ...{ uid } })
      .then((res) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        setLoginStatus(res.status);
        const { list = [], pages } = res.data || {};
        setQuesList(list);
        setPageCount(pages);
        setListLoading(false);
        setQuesParam({
          ...quesParam,
          quesList: list,
          totalPage: pages * page_count,
        });
        setTimeout(() => {
          curQid >= 0 && scrollToAnchor(curQid);
        }, 100);
      })
      .catch((err) => {
        setQuesList([]);
        setListLoading(false);
        setIsError(true);
      });
  }, [quesListParam]);

  const setPageParam = useCallback((page: number) => {
    setQuesListParam({
      ...quesListParams.current,
      page,
    });
  }, []);

  const goPraticeInfo = useCallback((id: number, index: number) => {
    setQuesParam({
      ...quesParams.current,
      curQuesIndex: index,
      totalPage: totalPage.current * 15,
      curQid: id,
    });
    setTimeout(() => {
      history.push({ pathname: `/ques/info`, state: { qid: id } });
    }, 0);
  }, []);

  const onPrev = useCallback((num: number) => {
    setPageParam(num);
  }, []);
  const onNext = useCallback((num: number) => {
    setPageParam(num);
  }, []);
  const onCurrent = useCallback((num: number) => {
    setPageParam(num);
  }, []);
  const curItem = useCallback((id: number) => {
    if (id === 1) {
      setQuesListParam({
        ...quesListParams.current,
        condition: {
          biz_type: 2,
        },
        page: 1,
      });
    } else {
      let tagName = navItemsArr.current[id - 1].name;
      setQuesListParam({
        ...quesListParams.current,
        condition: {
          biz_type: 1,
          tech_tag: [tagName],
        },
        page: 1,
      });
    }
    setQuesParam({
      ...quesParams.current,
      curNav: id,
      quesList: [],
    });
  }, []);
  return (
    <>
      <Suspense fallback={Loading}>
        <SortNav
          navItems={navItems}
          curItemId={quesParam.curNav}
          curItem={curItem}
        />
        <div className='page-ques layout-container'>
          <div className='ques-bank'>
            {quesList.map((item, index) => (
              <div
                className='ques-item'
                key={item.qid}
                id={item.qid}
                onClick={() => {
                  goPraticeInfo(item.qid, index);
                }}
              >
                <div className='item-icon'>
                  <i style={{ backgroundColor: "#ff5f56" }}></i>
                  <i style={{ backgroundColor: "#ffbd2e" }}></i>
                  <i style={{ backgroundColor: "#27c93f" }}></i>
                </div>
                <div className='ques-con'>
                  <p className='item-til'>{item[item.qtype].title}</p>
                  {item[item.qtype].subject ? (
                    <MarkRender
                      mardownStr={item[item.qtype].subject}
                      showTopic={false}
                      setHeight={false}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          totalPage={pageCount}
          onPrev={onPrev}
          onNext={onNext}
          onCurrent={onCurrent}
          curPage={quesListParam.page}
          isShow={!sortLoading}
        />

        {listLoading ? <Loading /> : null}
      </Suspense>
      <Totast visible={isError}></Totast>
    </>
  );
};
export default QuesBank;
