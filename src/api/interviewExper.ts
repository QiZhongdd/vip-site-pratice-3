import { http } from "../utils/index";

export function getInterviewExperInfo(param: { path: string; uid: number }) {
  return http.post("/api/interviewExperInfo", {
    ...param,
  });
}
export function getInterviewExperList(uid: number) {
  return http.post("/api/interviewExperList", { uid });
}
export function getList() {
  return http.get("/mdList");
}