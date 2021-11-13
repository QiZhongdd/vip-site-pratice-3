import React, {
    FC,
    useEffect,
    useState,
    useCallback,
    useRef,
    Suspense,
  } from "react";
  import "./quesInfo.css";
  import MarkRender from "@components/MarkRender/markRender";
  import { useHistory, useLocation } from "react-router-dom";
  import { ques } from "@api/index";
  import Loading from "@components/Loading/Loading";
  // 字体加密
  import { setFont } from "@utils/index";
  import { useLoginCheck } from "@hooks/index";
  import { loginSel } from "@recoil/selectors/loginSelectors";
  import Totast from "@components/Totast/totast";
  import {
    quesListSelect,
    quesSelect,
  } from "@recoil/selectors/quesListSelectors";
  import { useRecoilState, useRecoilValue } from "recoil";
  import { storage } from "../../utils/localStorage/index";
  
  const InterviewExperInfo: FC<{}> = () => {
    // console.log("面试题详情");
    let history = useHistory();
    const location = useLocation<{ qid: number }>();
    let qid = 0;
    if (!location.state) {
      qid = storage.get("qid");
      if (!qid) {
        history.replace("/ques");
        return <></>;
      }
    } else {
      qid = location.state.qid;
      storage.set("qid", qid);
    }
    const { uid } = useRecoilValue(loginSel);
    const [md, setMd] = useState("");

    const [loading, setLoading] = useState(true);
    const { setLoginStatus } = useLoginCheck();

    const [quesListParam, setQuesListParam] = useRecoilState(quesListSelect);

    const quesListParams = useRef(quesListParam);
    quesListParams.current = quesListParam;
    const [quesParam, setQuesParam] = useRecoilState(quesSelect);
    const quesParams = useRef(quesParam);
    quesParams.current = quesParam;

    let _componentStatus = useRef(true);
    const [isError, setIsError] = useState(false);
    const [noNextQues,setNoNextQues] = useState(false);
    useEffect(() => {
      return () => {
        _componentStatus.current = false;
        // setQuesParam({
        //   ...quesParams.current,
        //   quesList: [],
        // });
      };
    }, []);
    useEffect(() => {
      ques
        .getQuesInfo({
          qid,
          uid,
        })
        .then((res) => {
          if (!_componentStatus.current) {
            _componentStatus = null;
            return;
          }
          setLoginStatus(res.status);
          const quesInfo = res.data.md_str;
          setMd(quesInfo);
          setFont(res.data.key, "getInfo", setLoading);
          setQuesListParam({
            ...quesListParams.current,
          });
        })
        .catch((err) => {
          setLoading(false);
          setIsError(true);
        });
    }, []);
  
    const goBack = useCallback(() => {
      history.push("/ques");
    }, []);
    const getQuesInfo = useCallback((qid: number) => {
      ques
        .getQuesInfo({
          qid: qid,
          uid,
        })
        .then((res) => {
          if (!_componentStatus.current) {
            _componentStatus = null;
            return;
          }
          setLoginStatus(res.status);
          const quesInfo = res.data.md_str;
          history.push({ pathname: location.pathname, state: { qid } });
          setMd(quesInfo);
          setFont(res.data.key, "getInfo", setLoading);
          setLoading(true);
          setQuesParam({
            ...quesParams.current,
            curQid: qid,
          });
        })
        .catch((err) => {
          setLoading(false);
          setIsError(true);
        });
    }, []);
    const getQid = useCallback((index: number) => {
      const { quesList } = quesParams.current;
      const params = quesListParams.current;
      const quesL = quesList.length;
      if (quesL <= 0) {
        return;
      }
      setLoading(true);
      let { qid = -1 } = quesList[index] || {};
      if (qid < 0) {
        ques
          .getQuesList({
            ...params,
            ...{ uid },
            page: params.page + 1,
          })
          .then((res) => {
            const quesListNew = [...quesList, ...res.data.list];
            qid = quesListNew[index].qid;
            // console.log("qid", qid);
            getQuesInfo(qid);
            setQuesParam({
              ...quesParams.current,
              quesList: quesListNew,
              curQid: qid,
            });
            setQuesListParam({
              ...quesListParams.current,
              ...{ uid },
              page: params.page + 1,
            });
          })
          .catch((err) => {
            console.log(err);
            setIsError(true);
          });
      } else {
        getQuesInfo(qid);
      }
    }, []);
    const goNextQues = useCallback(() => {
      let { curQuesIndex, totalPage, quesList } = quesParams.current;
      let { page, page_count } = quesListParams.current;
      const checkNoNextQues =
        page * page_count === totalPage && curQuesIndex >= quesList.length-1;
        setNoNextQues(checkNoNextQues);
      if (checkNoNextQues) {
        return;
      }
      curQuesIndex++;
      setQuesParam({
        ...quesParams.current,
        curQuesIndex,
      });
      getQid(curQuesIndex);
    }, []);
    const goPrevQues = useCallback(() => {
      let { curQuesIndex, quesList } = quesParams.current;
      curQuesIndex--;
      if (curQuesIndex < 0 || quesList.length <= 0) {
        return;
      }
      setNoNextQues(false);
      setQuesParam({
        ...quesParams.current,
        curQuesIndex,
      });
      getQid(curQuesIndex);
    }, []);
    return (
      <>
        <Suspense fallback={Loading}>
          <div className="ques-info layout-container">
            {true ? (
              <div className="btn-box">
                <div className="btn-back" onClick={goBack}>
                  <i className="iconfont">&#xe653;</i>
                </div>
                {quesParam.quesList.length <= 0 ? null : (
                  <>
                    <div
                      className={`btn-prev ${
                        quesParam.curQuesIndex <= 0 ||
                        quesParam.quesList.length <= 0
                          ? "disable"
                          : ""
                      }`}
                      onClick={goPrevQues}
                    >
                      上一题
                      {/* <i className="iconfont">&#xe616;</i> */}
                    </div>
                    <div
                      className={`btn-next ${
                        noNextQues
                          ? "disable"
                          : ""
                      }`}
                      onClick={goNextQues}
                    >
                      下一题
                      {/* <i className="iconfont">&#xe617;</i> */}
                    </div>
                  </>
                )}
              </div>
            ) : null}
  
            <MarkRender
              mardownStr={md}
              heightGap={66}
              opaicty={!loading ? 1 : 0}
            ></MarkRender>
          </div>
          {loading ? <Loading /> : null}
        </Suspense>
        <Totast visible={isError}></Totast>
      </>
    );
  };
  export default InterviewExperInfo;
  