import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import ItemLevelForm from "./components/itemLevelForm";
import SuccessRequirementMessage from "./components/successRequirementMessage";
import CounteractResults from "./components/counteractResults";
import { SuccessLevel, SuccessLevelDetail, UseItemLevel } from "./types/index";
import Explanation from './components/explanation';


const successLevel: SuccessLevel = {
    impossible: {
      text: "Effect cannot be counteracted",
      colorValue: "darkred",
    },
    critSuccess: { text: "Critical Success", colorValue: "red" },
    success: { text: "Success", colorValue: "green" },
    failure: { text: "Failure", colorValue: "lightgreen" },
    none: { text: "Please enter levels", colorValue: "red" },
  }


export default function App() {
  const [counteractAttemptLevel, setCounteractAttemptLevel] =
    useState<number>(1);
  const [counteractTargetLevel, setCounteractTargetLevel] = useState<number>(1);
  const [counteractDC, setCounteractDC] = useState<number>(0);
  const [counteractRoll, setCounteractRoll] = useState<number>(0);
  const [counteractResult, setCounteractResult] = useState<boolean>(false);
  const [disableCheckButton, setDisableCheckButton] = useState<boolean>(false);
  const [useItemLevel, setUseItemLevel] = useState<UseItemLevel>({
    target: false,
    attempt: false,
  });
  const [showResults, setShowResults] = useState<boolean>(false)

  const [successRequirements, setSuccessRequirements] =
    useState<SuccessLevelDetail>(successLevel.critSuccess);

  const calculateRequiredSuccess = useCallback(
    (baseAttemptLevel: number, baseTargetLevel: number) => {
      const { targetLevel, attemptLevel } = calculateEffectiveLevel(
        baseAttemptLevel,
        baseTargetLevel
      );
      setDisableCheckButton(false);
      const levelDifference = targetLevel - attemptLevel;
      if (levelDifference < 0) setSuccessRequirements(successLevel.failure);
      if (levelDifference === 0 || levelDifference === 1)
        setSuccessRequirements(successLevel.success);
      if (levelDifference === 2 || levelDifference === 3)
        setSuccessRequirements(successLevel.critSuccess);
      if (levelDifference >= 4) {
        setSuccessRequirements(successLevel.impossible);
        setDisableCheckButton(true);
      }
    },
    [useItemLevel, successLevel]
  );

  useEffect(() => {
    setShowResults(false)
    if (counteractAttemptLevel === 0 || counteractTargetLevel === 0) {
      setSuccessRequirements(successLevel.none);
    } else {
      calculateRequiredSuccess(counteractAttemptLevel, counteractTargetLevel);
    }
  }, [
    counteractAttemptLevel,
    counteractTargetLevel,
    calculateRequiredSuccess,
    successLevel.none,
    counteractDC,
    counteractRoll
  ]);

  const toggleUseItemLevelTarget = (val: boolean) => {
    setUseItemLevel((prev: UseItemLevel) => ({ ...prev, target: val }));
  };

  const toggleUseItemLevelAttempt = (val: boolean) => {
    setUseItemLevel((prev: UseItemLevel) => ({ ...prev, attempt: val }));
  };

  function calculateEffectiveLevel(
    baseAttemptLevel: number,
    baseTargetLevel: number
  ) {
    const attemptLevel = useItemLevel.attempt
      ? Math.ceil(baseAttemptLevel / 2)
      : baseAttemptLevel;
    const targetLevel = useItemLevel.target
      ? Math.ceil(baseTargetLevel / 2)
      : baseTargetLevel;
    return { targetLevel, attemptLevel };
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Counteract Calculator</h1>
          <p className="text-muted-foreground">Pathfinder 2e Counteract Check</p>
        </div>

        {/* Success Requirement */}
        <div className="bg-card border border-border rounded-lg p-4">
          <SuccessRequirementMessage
            text={successRequirements.text}
            color={successRequirements.colorValue}
          />
        </div>

        {/* Level Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h2 className="text-lg font-semibold text-primary">Levels</h2>
            <ItemLevelForm
              value={counteractAttemptLevel}
              setValue={setCounteractAttemptLevel}
              label="Counteract"
              levelOrRank={true}
              useItemLevel={useItemLevel.attempt}
              setUseItemLevel={toggleUseItemLevelAttempt}
            />
            <ItemLevelForm
              value={counteractTargetLevel}
              setValue={setCounteractTargetLevel}
              label="Counteract Target"
              levelOrRank={true}
              useItemLevel={useItemLevel.target}
              setUseItemLevel={toggleUseItemLevelTarget}
            />
          </div>

          {/* DC and Roll Inputs */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h2 className="text-lg font-semibold text-primary">Roll & DC</h2>
            <ItemLevelForm
              value={counteractDC}
              setValue={setCounteractDC}
              label="Counteract DC"
            />
            <ItemLevelForm
              value={counteractRoll}
              setValue={setCounteractRoll}
              label="Counteract Roll"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-card border border-border rounded-lg p-4">
          <CounteractResults
            counteractRoll={counteractRoll}
            counteractDC={counteractDC}
            successRequirements={successRequirements}
            successLevel={successLevel}
            setCounteractResult={setCounteractResult}
            counteractResult={counteractResult}
            disableCheckButton={disableCheckButton}
            showResults={showResults}
            setShowResults={setShowResults}
          />
        </div>
      </div>
    </div>
  );
}
