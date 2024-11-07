/* eslint-disable react/prop-types */
import React from "react";
import { SuccessLevel, SuccessLevelDetail } from "../types/index";

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
    <>
      <button
        onClick={() => handleResult(true, true)}
        disabled={disableCheckButton}
        style={{ color: "green" }}
      >
        Natural 20
      </button>

      <button onClick={() => handleResult()} disabled={disableCheckButton}>
        Check Counteract Result
      </button>

      <button
        onClick={() => handleResult(true, false)}
        disabled={disableCheckButton}
        style={{ color: "red" }}
      >
        Natural 1
      </button>
      {showResults ? (
        counteractResult ? (
          <p style={{ color: "green" }}>Success!</p>
        ) : (
          <p style={{ color: "red" }}>Failure</p>
        )
      ) : (
        ""
      )}
    </>
  );
}
