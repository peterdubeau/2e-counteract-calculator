import React from "react";
import { SuccessLevel, SuccessLevelDetail } from "../types/index";
import { Button } from "@/components/ui/button";

type CounteractResultsProps = {
  counteractRoll: number;
  counteractDC: number;
  successLevel: SuccessLevel;
  successRequirements: SuccessLevelDetail;
  setCounteractResult: any;
  counteractResult: boolean;
  disableCheckButton: boolean;
  showResults: boolean;
  setShowResults: any;
};

export default function CounteractResults({
  counteractRoll,
  counteractDC,
  successLevel,
  successRequirements,
  setCounteractResult,
  counteractResult,
  disableCheckButton,
  showResults,
  setShowResults,
}: CounteractResultsProps) {
  function handleResult(crit?: boolean, isNatural20?: boolean) {
    const { critSuccess, success, failure, impossible } = successLevel;
    const counteractAttemptTotal = calculateCounteractRoll(crit, isNatural20);
    setShowResults(true);
    switch (successRequirements.text) {
      case success.text:
        if (counteractAttemptTotal >= counteractDC) {
          setCounteractResult(true);
        } else {
          setCounteractResult(false);
        }
        break;

      case critSuccess.text:
        if (counteractAttemptTotal >= counteractDC + 10) {
          setCounteractResult(true);
        } else {
          setCounteractResult(false);
        }
        break;

      case failure.text:
        if (counteractAttemptTotal >= counteractDC - 10) {
          setCounteractResult(true);
        } else {
          setCounteractResult(false);
        }
        break;

      case impossible.text:
        setCounteractResult(false);
        break;
    }
  }

  function calculateCounteractRoll(
    crit?: boolean,
    isNatural20?: boolean
  ): number {
    let rollModifier: number = 0;

    if (crit) {
      rollModifier = isNatural20 ? 10 : -10;
    }

    return counteractRoll + rollModifier;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-primary mb-4">Check Result</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={() => handleResult(true, false)}
          disabled={disableCheckButton}
          variant="destructive"
          size="lg"
          className="h-14 text-sm font-medium"
        >
          Natural 1
        </Button>
        
        <Button
          onClick={() => handleResult()}
          disabled={disableCheckButton}
          size="lg"
          className="h-14 text-sm font-medium"
        >
          Check Result
        </Button>

        <Button
          onClick={() => handleResult(true, true)}
          disabled={disableCheckButton}
          variant="secondary"
          size="lg"
          className="h-14 text-sm font-medium text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
        >
          Natural 20
        </Button>
      </div>

      {showResults && (
        <div className="text-center p-4 bg-muted rounded-lg">
          {counteractResult ? (
            <p className="text-xl font-bold text-green-400">Success!</p>
          ) : (
            <p className="text-xl font-bold text-red-400">Failure</p>
          )}
        </div>
      )}
    </div>
  );
}
