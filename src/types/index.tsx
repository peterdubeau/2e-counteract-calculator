export type CounteractResultsProps = {  
  counteractRoll: number,
  counteractDC: number,
  successLevel: SuccessLevel,
  successRequirements: SuccessLevelDetail,
  setCounteractResult: any,
  counteractResult: boolean,
  disableCheckButton: boolean,
  showResults: boolean,
  setShowResults: any
}

export type ExplanationProps = {
  text: string,
  color: string
}

export type ItemLevelProps = {
  label: string,
  value: number,
  setValue: any, // this is actually a hook
  levelOrRank?: boolean
  useItemLevel?: boolean
  setUseItemLevel?: any
}

export type UseItemLevel = {
  target: boolean,
  attempt: boolean
}

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


export type SuccessRequirementMessageProps = {
  text: string;
  color: string;
};

