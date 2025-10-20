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
  setIsNatural20: any;
  setIsNatural1: any;
  showExplanation: boolean;
  setShowExplanation: any;
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
  setIsNatural20,
  setIsNatural1,
  showExplanation,
  setShowExplanation,
}: CounteractResultsProps) {
  function handleResult(crit?: boolean, isNatural20?: boolean) {
    const { critSuccess, success, failure, impossible } = successLevel;
    setShowResults(true);
    
    // Set natural roll flags
    setIsNatural20(isNatural20 || false);
    setIsNatural1(crit && !isNatural20 || false);
    
    // First determine the base result without natural roll effects
    let baseSuccess = false;
    switch (successRequirements.text) {
      case success.text:
        baseSuccess = counteractRoll >= counteractDC;
        break;
      case critSuccess.text:
        baseSuccess = counteractRoll >= counteractDC + 10;
        break;
      case failure.text:
        baseSuccess = counteractRoll >= counteractDC - 10;
        break;
      case impossible.text:
        baseSuccess = false;
        break;
    }
    
    // Apply natural roll degree shifts
    if (isNatural20) {
      // Natural 20 improves degree of success by 1 step
      if (successRequirements.text === failure.text) {
        // Failure → Success
        setCounteractResult(true);
      } else if (successRequirements.text === success.text) {
        // Success → Critical Success (but we can't go higher than required)
        setCounteractResult(true);
      } else if (successRequirements.text === critSuccess.text) {
        // Critical Success → still Critical Success
        setCounteractResult(baseSuccess);
      } else {
        // Impossible stays impossible
        setCounteractResult(false);
      }
    } else if (crit && !isNatural20) {
      // Natural 1 worsens degree of success by 1 step
      if (successRequirements.text === critSuccess.text) {
        // Critical Success → Success
        setCounteractResult(baseSuccess);
      } else if (successRequirements.text === success.text) {
        // Success → Failure
        setCounteractResult(false);
      } else if (successRequirements.text === failure.text) {
        // Failure → Critical Failure (but we can't go lower than required)
        setCounteractResult(false);
      } else {
        // Impossible stays impossible
        setCounteractResult(false);
      }
    } else {
      // Normal roll - use base result
      setCounteractResult(baseSuccess);
    }
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
          className="h-14 text-sm font-medium bg-green-400 text-white border-green-400 hover:bg-green-500 hover:text-white"
        >
          Natural 20
        </Button>
      </div>

      {showResults && (
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            {counteractResult ? (
              <p className="text-xl font-bold text-green-400">Success!</p>
            ) : (
              <p className="text-xl font-bold text-red-400">Failure</p>
            )}
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => setShowExplanation(!showExplanation)}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
