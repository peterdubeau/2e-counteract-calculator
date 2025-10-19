import React, {useState} from "react";
import { SuccessLevelDetail } from "../types";

type ExplanationProps = {
  text: string;
  color: string;
  counteractAttemptLevel: number;
  counteractTargetLevel: number;
  counteractResult: boolean;
  successRequirements: SuccessLevelDetail;
};


export default function Explanation({
  text,
  color,
  counteractAttemptLevel,
  counteractTargetLevel,
  counteractResult,
  successRequirements,
}: ExplanationProps) {
  
  const [higherOrLower, setHigherOrLower] = useState('lower')
  
  return (
    <p style={{ color: color }}>
      This counteract check was a {counteractResult}
      The counteracting action was **RANGE** levels {higherOrLower} than the
      targeted effect Therefore a {successRequirements.text} roll was required
    </p>
  );
}
