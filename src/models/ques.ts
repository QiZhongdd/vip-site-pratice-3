export interface QuesListParams {
  uid: number;
  condition: {
    biz_type: number;
    tech_tag?: string[];
  };
  page: number;
  page_count: number;
}

export interface QuesParams {
  curNav: number;
  curQuesIndex: number;
  curQid?: number;
  totalPage: number;
  quesList: any[];
}

export const initQuesListParams = (): QuesListParams => ({
  uid: 0,
  condition: {
    biz_type: 2,
  },
  page: 1,
  page_count: 15,
});
export const initQuesParams = (): QuesParams => ({
  curNav: 1,
  curQuesIndex: -1,
  totalPage: 1,
  quesList: [],
});
