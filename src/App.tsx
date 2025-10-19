import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import ItemLevelForm from "./components/itemLevelForm";
import SuccessRequirementMessage from "./components/successRequirementMessage";
import CounteractResults from "./components/counteractResults";
import { SuccessLevel, SuccessLevelDetail, UseItemLevel } from "./types/index";
import Explanation from './components/explanation';
import { Button } from "./components/ui/button";


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
  const [showHelp, setShowHelp] = useState<boolean>(false)

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
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-primary">Counteract Calculator</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="text-sm"
            >
              {showHelp ? "Hide Help" : "Help"}
            </Button>
          </div>
          <p className="text-muted-foreground">Pathfinder 2e Counteract Check</p>
        </div>

        {/* Help Section */}
        {showHelp && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">How to Use</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Enter Your Levels</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Counteract Level:</strong> The spell rank or level of your counteract attempt</li>
                  <li><strong>Counteract Target Level:</strong> The spell rank or level of the effect you're counteracting</li>
                  <li><strong>Item Level Toggle:</strong> Enable if using an item (uses half the item's level, rounded up)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Enter Your Roll</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Counteract DC:</strong> The difficulty class to beat</li>
                  <li><strong>Counteract Roll:</strong> Your d20 roll result including all modifiers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. Check Your Result</h3>
                <p className="text-muted-foreground mb-2">The app automatically calculates what success level you need based on the level difference:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Failure</strong> (target 1+ levels lower): Roll against DC-10</li>
                  <li><strong>Success</strong> (equal levels or target 1 level higher): Roll against DC</li>
                  <li><strong>Critical Success</strong> (target 2-3 levels higher): Roll against DC+10</li>
                  <li><strong>Impossible</strong> (target 4+ levels higher): Cannot be counteracted</li>
                </ul>
                <br />
                <p className="text-muted-foreground mb-2">Click the appropriate button:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>"Check Result"</strong> for a roll of 2-19 on your d20</li>
                  <li><strong>"Natural 20"</strong> for a roll of 20 on your d20</li>
                  <li><strong>"Natural 1"</strong> for a roll of 1 on your d20</li>
                </ul>
              </div>
            </div>
          </div>
        )}

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
