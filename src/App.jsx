import { useState, useEffect, useCallback } from "react";

import Form from "./components/forms";
import SuccessMessage from "./components/successMessage";

export default function App() {
  const [counteractAttemptLevel, setCounteractAttemptLevel] = useState(0);
  const [counteractTargetLevel, setCounteractTargetLevel] = useState(0);
  const [counteractDC, setCounteractDC] = useState(10);
  const [counteractRoll, setCounteractRoll] = useState(0);
  const [counteractResult, setCounteractResult] = useState(false);

  const successLevel = {
    impossible: {
      text: "Effect cannot be counteracted",
      colorValue: "darkred",
    },
    critSuccess: { text: "Critical Success", colorValue: "red" },
    success: { text: "Success", colorValue: "green" },
    failure: { text: "Failure", colorValue: "lightgreen" },
    none: {text: "Please enter levels", colorValue: "red"}
  };

  const [successRequirements, setSuccessRequirements] = useState(
    successLevel.critSuccess.text
  );

  useEffect(() => {
    if (counteractAttemptLevel === 0 || counteractTargetLevel === 0){
      setSuccessRequirements(successLevel.none)
    } else {
      calculateRequiredSuccess(counteractAttemptLevel, counteractTargetLevel);
    }
  }, [counteractAttemptLevel, counteractTargetLevel]);

  function calculateRequiredSuccess(attemptLevel, targetLevel) {
    const levelDifference = targetLevel - attemptLevel;
    if (levelDifference < 0) {
      setSuccessRequirements(successLevel.failure);
      return;
    }

    if (levelDifference === 0 || levelDifference === 1) {
      setSuccessRequirements(successLevel.success);
      return;
    }

    if (levelDifference >= 4) {
      setSuccessRequirements(successLevel.impossible);
      return;
    } else {
      setSuccessRequirements(successLevel.critSuccess);
      return;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="message flex justify-center mb-4">
        <SuccessMessage
          text={successRequirements.text}
          color={successRequirements.colorValue}
        />
      </div>
      <div className="levels w-full flex justify-center mb-4">
        <div className="grid grid-cols-2 gap-4">
          <Form
            value={counteractAttemptLevel}
            setValue={setCounteractAttemptLevel}
            label="Counteract attempt level"
            options={{ levelOrRank: true }}
          />
          <Form
            value={counteractTargetLevel}
            setValue={setCounteractTargetLevel}
            label="Counteract Target level"
            options={{ levelOrRank: true }}
          />
        </div>
      </div>
      <div className="roll-and-dc w-full flex justify-center">
        <div className="grid grid-cols-2 gap-4">
          <Form
            value={counteractDC}
            setValue={setCounteractDC}
            label="Counteract DC"
          />
          <Form
            value={counteractRoll}
            setValue={setCounteractRoll}
            label="Counteract Roll"
          />
        </div>
      </div>
    </div>
  );
}
