import { selector } from "recoil";
import { quesListState, quesState } from "../atoms/quesAtoms";
import {
  initQuesListParams,
  QuesListParams,
  initQuesParams,
  QuesParams,
} from "@models/ques";
import { storage } from "@utils/index";

export const quesListSelect = selector({
  key: "quesListSel",
  get: ({ get }) => {
    let quesListParam = get(quesListState);
    if (quesListParam.uid === 0) {
      try {
        quesListParam = storage.get("quesListParam") || quesListParam;
      } catch (error) {
        quesListParam = quesListParam;
      }
    }
    return quesListParam;
  },
  set: ({ set }, newVal: QuesListParams) => {
    set(quesListState, newVal);
    storage.set("quesListParam", newVal);
  },
});
export const quesSelect = selector({
  key: "quesSel",
  get: ({ get }) => {
    let quesParam = get(quesState);
    if (quesParam.curQuesIndex === -1) {
      try {
        quesParam = storage.get("quesParam") || quesParam;
      } catch (error) {
        quesParam = quesParam;
      }
    }
    return quesParam;
  },
  set: ({ set }, newVal: QuesParams) => {
    set(quesState, newVal);
    storage.set("quesParam", newVal);
  },
});
