import { http } from "../utils/index";

export type IJobListParams = {
  uid: number;
  page?: number;
  page_count?: number;
};

export function getQuesList(param: IJobListParams) {
  return http.post("/api/jobList", { ...param });
}
export function getJobInfo(param: { uid: number; jid: number }) {
  return http.post("/api/jobInfo", { ...param });
}
