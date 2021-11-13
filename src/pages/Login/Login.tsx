import React, { FC, useEffect, useState, useRef, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "@recoil/atoms/loginAtoms";
import { LoginInfo } from "@models/loginInfo";
import { user } from "@api/index";
import Loading from "@components/Loading/Loading";
import { clearPending, storage } from "@utils/index";
import { QRLine } from "react-qrbtf";
import "./login.css";
import Totast from "@components/Totast/totast";

const Login: FC<{}> = () => {
  // console.log("登录页面");
  let history = useHistory();
  let location = useLocation();

  // 定义的一个变量
  const isClearPending = useRef(true);

 //   记录跳转之前的地址
  let redirectUrl = location.state
    ? (location.state as any).from && (location.state as any).from.pathname
    : "/";

  const [qr, setQr] = useState("");

  const [scanRes, setScanRes] = useState<{
    msg: string;
    content?: string;
    code?: string;
  }>({ msg: "扫码登录<br/>京程一灯FE社区" });

  // 这里是为了进行接口的重复请求
  const [qrCount, setQrCount] = useState(0);


  const [uuid, setUuid] = useState("");
  const [codeCount, setCodeCount] = useState(0);

  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  let _componentStatus = useRef(true);
  const [isError, setIsError] = useState(false);

//   判断当前页面是否已经销毁，跳走
  useEffect(() => {
    return () => {
      _componentStatus.current = false;
    };
  }, []);

  //  获取用户信息，判断是否是vip用户
  useEffect(() => {
    const { code } = scanRes;
    if (!code) return;
    user
      .getUserInfo({ code })
      .then((res) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        if (res.status === -5) {
          setScanRes({
            msg: "只限VIP认证用户访问",
          });
          return;
        }
        loginIn(res.data);
      })
      .catch((err) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        setIsError(true);
      });
  }, [scanRes.code]);

  // 获取二维码
  useEffect(() => {
    user
      .getQR()
      .then((res) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        const { qr, uuid } = res.data;
        setQr(qr);
        setUuid(uuid);
      })
      .catch((err) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        setIsError(true);
      });
  }, [qrCount]);

  // 获取code
  useEffect(() => {
    let timer: number = null;
    if (!uuid) return;
    user
      .getCode({ uuid })
      .then((res: any) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        if (res.status === 405) {
          const { code } = res.data;
          setScanRes({
            msg: res.msg,
            code: code,
          });
          isClearPending.current = false;
        } else if (res.status === 404) {
          if (scanRes.msg !== "扫描成功") {
            setScanRes({
              msg: res.msg.title,
              content: res.msg.content,
            });
          }
          timer = window.setTimeout(() => {
            setCodeCount((preState) => {
              return ++preState;
            });
          }, 1000);
        } else if (res.status === 403) {
          setScanRes({
            msg: res.msg.title,
            content: res.msg.content,
          });
          timer = window.setTimeout(() => {
            setCodeCount((preState) => {
              return ++preState;
            });
          }, 1000);
        } else if (res.status === 500) {
          setQrCount((preState) => ++preState);
        } else {
          timer = window.setTimeout(() => {
            setCodeCount((preState) => {
              return ++preState;
            });
          }, 1000);
        }
      })
      .catch((err) => {
        if (!_componentStatus.current) {
          _componentStatus = null;
          return;
        }
        if (err !== -3) {
          setQrCount((preState) => ++preState);
        }
      });
    return () => {
      clearTimeout(timer);
      if (isClearPending.current) {
        clearPending();
      }
    };
  }, [uuid, codeCount]);

  const loginIn = (userInfo: LoginInfo) => {
    setLoginInfo(userInfo);
    if (redirectUrl === "/login") {
      redirectUrl = "/";
    }
    storage.set("userInfo", userInfo);
    history.push(redirectUrl);
  };

  return (
    <>
      <Suspense fallback={Loading}>
        <div className="page-login layout-container">
          <div className="scan-box-con">
            {/* <div className="scan-box-clip"> */}
            {/* <div className="scan-box-bg"></div> */}
            <div className="scan-box">
              {qr ? (
                <>
                  {/* <img className="scan-img" src={qr} alt="" /> */}
                  <QRLine
                    value={qr}
                    className="my-qrcode"
                    styles={{ svg: { width: "260px", height: "260px" } }}
                    // type="planet"
                    // size={50}
                    // opacity={100}
                    level="M"
                    lineWidth={70}
                    posType="rect"
                    direction="cross"
                    lineColor="#fefefe"
                    posColor="#fefefe"
                    // posColor="##a52ff7"
                    // title={scanRes.msg}
                  />
                  {/* <div className="login-tip-til">{scanRes.msg}</div>
                  <div className="login-tip-content">{scanRes.content}</div> */}
                </>
              ) : (
                <Loading />
              )}
            </div>
            {/* </div> */}

            <div className="tip-txt">
              <div
                className="login-tip-til"
                dangerouslySetInnerHTML={{ __html: scanRes.msg }}
              ></div>
              <div className="login-tip-content">{scanRes.content}</div>
            </div>
            <img
              className="qrbg"
              src={require("@assets/images/qrbg2.png")}
              alt=""
            />
          </div>

          {/* <div className="message">
          All your dreams can come true. <br />
          If you have the courage to pursue them.
        </div> */}
          {/* <ParticlesBg  num={100} type="lines" bg={true} /> */}
        </div>
      </Suspense>
      <Totast visible={isError}></Totast>
    </>
  );
};
export default Login;
