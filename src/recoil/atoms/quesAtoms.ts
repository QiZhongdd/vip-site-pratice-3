import { atom } from "recoil";
import { initQuesListParams, initQuesParams } from "@models/ques";

export const quesListState = atom({
  key: "QuesListParams",
  default: initQuesListParams(),
});
export const quesState = atom({
  key: "QuesParams",
  default: initQuesParams(),
});
