import { selector } from "recoil";
import { loginState } from "../atoms/loginAtoms";

import { LoginInfo } from "@models/loginInfo";
import { storage } from "@utils/index";

export const loginSel = selector({
  key: "loginSel",
  get: ({ get }) => {
    // 先从recoil 里边取值
    let loginInfo = get(loginState);
    if (!loginInfo.headimgurl) {
      try {
        //   看本地存储有没有
        loginInfo = storage.get("userInfo") || loginInfo;
      } catch (error) {
        loginInfo = loginInfo;
      }
    }
    return loginInfo;
  },
  set: ({ set }, newVal: LoginInfo) => {
    set(loginState, newVal);
  },
});
