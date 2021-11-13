import { http } from "../utils/index";

export type IVideoListParams = {
  uid: number;
};
export type IVideoInfoParams = {
  uid: number;
  id: string;
};

export function getVideoList(param: IVideoListParams) {
  return http.post("/api/videoList", { ...param });
}
export function getVideoInfo(param: IVideoInfoParams) {
  return http.post("/api/videoInfo", { ...param });
}
