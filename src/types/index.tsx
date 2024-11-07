export type UseItemLevel = {
  target: boolean;
  attempt: boolean;
};

export type SuccessLevel = {
  impossible: SuccessLevelDetail;
  critSuccess: SuccessLevelDetail;
  success: SuccessLevelDetail;
  failure: SuccessLevelDetail;
  none: SuccessLevelDetail;
};

export type SuccessLevelDetail = {
  text: string;
  colorValue: string;
};
