import React from "react";
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
  return (
    <p style={{ color: color }}>
      This counteract check was a {counteractResult}
      The counteracting action was **RANGE** levels **HIGHER/LOWER** than the
      targeted effect Therefore a {successRequirements.text} roll was required
    </p>
  );
}
