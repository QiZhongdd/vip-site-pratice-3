import { http } from "../utils/index";

export type QuesInfoParam = {
  uid: number;
  condition: {
    biz_type: number;
    tech_tag?: Array<string>;
  };
  page: number;
  page_count: number;
};
export function getQuesSort(param: { uid: number }) {
  return http.post("/api/getQuesSort", { ...param });
}
export function getQuesList(param: QuesInfoParam) {
  return http.post("/api/getQuesList", { ...param });
}
export function getQuesInfo(param: { qid: number; uid: number }) {
  return http.post("/api/getQuesInfo", { ...param });
}
