import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, Children } from "react";
import { storage } from "@utils/index";
import { useRecoilState } from "recoil";
import { loginState } from "@recoil/atoms/loginAtoms";
import { initLogin } from "@models/loginInfo";

const loginCheck = () => {
  // console.log("useLoginCheck");
  const history = useHistory();
  const location = useLocation();
  
  const [loginStatus, setLoginStatus] = useState(0);
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  useEffect(() => {
    if (loginStatus === 0) return;
    if (loginStatus == -4 || loginStatus == -5) {
      setLoginInfo(initLogin());
      storage.remove("userInfo");
      history.push({
        pathname: "/login",
        state: {
          from: {
            pathname: location.pathname,
          },
        },
      });
    }else{
      alert('服务开小差了');
    }
  }, [loginStatus]);
  return { loginStatus, setLoginStatus };
};
export default loginCheck;
