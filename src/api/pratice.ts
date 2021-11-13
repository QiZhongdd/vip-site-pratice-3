import { http } from "../utils/index";

export function getBestPraticeInfo(param: {
  path: string;
  uid: number;
  id?: number;
}) {
  return http.post("/api/bestPraticeInfo", {
    ...param,
  });
}
export function getBestPraticeList(uid: number) {
  return http.post("/api/bestPraticeList", { uid });
}
