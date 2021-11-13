import { http } from "../utils/index";


// 获取code 
export function getCode(param: { uuid: string }) {
  return http.post("/api/getCode", {
    ...param,
  });
}
// 获取二维码接口
export function getQR() {
  return http.get("/api/getQR");
}


// 获取用户信息
export function getUserInfo(param: { code: string }) {
  return http.post("/api/getUserInfo", {
    ...param,
  });
}


// 判断是否是vip用户
export function loginCheck() {
  return http.get("/api/loginCheck");
}


// 退出
export function loginOut() {
  return http.get("/api/loginOut");
}
