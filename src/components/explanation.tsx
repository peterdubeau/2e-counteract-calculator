import React from "react";
import { SuccessLevelDetail, UseItemLevel } from "../types";

type ExplanationProps = {
  counteractAttemptLevel: number;
  counteractTargetLevel: number;
  counteractResult: boolean;
  successRequirements: SuccessLevelDetail;
  counteractRoll: number;
  counteractDC: number;
  useItemLevel: UseItemLevel;
  isNatural20?: boolean;
  isNatural1?: boolean;
};

export default function Explanation({
  counteractAttemptLevel,
  counteractTargetLevel,
  counteractResult,
  successRequirements,
  counteractRoll,
  counteractDC,
  useItemLevel,
  isNatural20 = false,
  isNatural1 = false,
}: ExplanationProps) {
  
  // Calculate effective levels (same logic as in App.tsx)
  const calculateEffectiveLevel = (baseAttemptLevel: number, baseTargetLevel: number) => {
    const attemptLevel = useItemLevel.attempt
      ? Math.ceil(baseAttemptLevel / 2)
      : baseAttemptLevel;
    const targetLevel = useItemLevel.target
      ? Math.ceil(baseTargetLevel / 2)
      : baseTargetLevel;
    return { targetLevel, attemptLevel };
  };

  const { targetLevel, attemptLevel } = calculateEffectiveLevel(counteractAttemptLevel, counteractTargetLevel);
  const levelDifference = targetLevel - attemptLevel;
  
  // Natural rolls don't add numerical modifiers in PF2e - they shift degree of success
  const finalRoll = counteractRoll;
  
  // Calculate the DC adjustment based on success requirements
  const getDCAdjustment = () => {
    switch (successRequirements.text) {
      case "Critical Success":
        return 10;
      case "Failure":
        return -10;
      case "Success":
      default:
        return 0;
    }
  };
  
  const dcAdjustment = getDCAdjustment();
  const adjustedDC = counteractDC + dcAdjustment;
  
  // Determine if higher or lower
  const isHigher = levelDifference > 0;
  const levelDirection = isHigher ? "higher" : "lower";
  const levelDiff = Math.abs(levelDifference);
  
  return (
    <div className="space-y-3 text-sm">
      <h3 className="font-semibold text-primary">Calculation Breakdown:</h3>
      
      <div className="space-y-2 pl-4">
        {/* Level Calculation */}
        <div>
          <strong>Level Calculation:</strong>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Counteract Level: {counteractAttemptLevel}
              {useItemLevel.attempt && ` → ${attemptLevel} (item level ÷ 2, rounded up)`}
            </li>
            <li>
              Target Level: {counteractTargetLevel}
              {useItemLevel.target && ` → ${targetLevel} (item level ÷ 2, rounded up)`}
            </li>
            <li>
              Level Difference: {targetLevel} - {attemptLevel} = {levelDifference}
              {levelDifference !== 0 && ` (target is ${levelDiff} level${levelDiff > 1 ? 's' : ''} ${levelDirection})`}
            </li>
          </ul>
        </div>
        
        {/* Success Requirement */}
        <div>
          <strong>Success Requirement:</strong>
          <p className="ml-4">
            {levelDifference < 0 && "Target is lower → Failure required (DC-10)"}
            {levelDifference === 0 && "Equal levels → Success required (DC)"}
            {levelDifference === 1 && "Target 1 level higher → Success required (DC)"}
            {levelDifference === 2 && "Target 2 levels higher → Critical Success required (DC+10)"}
            {levelDifference === 3 && "Target 3 levels higher → Critical Success required (DC+10)"}
            {levelDifference >= 4 && "Target 4+ levels higher → Impossible to counteract"}
          </p>
        </div>
        
        {/* Roll Calculation */}
        {successRequirements.text !== "Effect cannot be counteracted" && (
          <div>
            <strong>Roll Calculation:</strong>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Roll Result: <strong>{counteractRoll}</strong></li>
              <li>Required DC: {counteractDC} + {dcAdjustment} = <strong>{adjustedDC}</strong></li>
              <li>
                Base Result: {finalRoll} vs {adjustedDC} = 
                <span className={`font-bold ${finalRoll >= adjustedDC ? 'text-green-600' : 'text-red-600'}`}>
                  {finalRoll >= adjustedDC ? ' SUCCESS' : ' FAILURE'}
                </span>
              </li>
              {(isNatural20 || isNatural1) && (
                <li className="mt-2 p-2 bg-muted rounded border-l-4 border-primary">
                  <strong>Natural Roll Effect:</strong>
                  {isNatural20 && (
                    <span className="text-green-600">
                      <br />Natural 20: Degree of success increased by 1 step
                    </span>
                  )}
                  {isNatural1 && (
                    <span className="text-red-600">
                      <br />Natural 1: Degree of success decreased by 1 step
                    </span>
                  )}
                </li>
              )}
              <li className="mt-2">
                <strong>Final Result: </strong>
                <span className={`font-bold ${counteractResult ? 'text-green-600' : 'text-red-600'}`}>
                  {counteractResult ? 'SUCCESS' : 'FAILURE'}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
