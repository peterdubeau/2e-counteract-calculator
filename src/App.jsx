import { useState, useEffect, useCallback, useMemo } from "react";

import ItemLevelForm from "./components/itemLevelForm";
import SuccessRequirementMessage from "./components/successRequirementMessage";
import CounteractResults from "./components/counteractResults";

export default function App() {
  const [counteractAttemptLevel, setCounteractAttemptLevel] = useState(1);
  const [counteractTargetLevel, setCounteractTargetLevel] = useState(1);
  const [counteractDC, setCounteractDC] = useState(0);
  const [counteractRoll, setCounteractRoll] = useState(0);
  const [counteractResult, setCounteractResult] = useState(false);
  const [disableCheckButton, setDisableCheckButton] = useState(false)

  const successLevel = useMemo(() => ({
    impossible: {
      text: "Effect cannot be counteracted",
      colorValue: "darkred",
    },
    critSuccess: { text: "Critical Success", colorValue: "red" },
    success: { text: "Success", colorValue: "green" },
    failure: { text: "Failure", colorValue: "lightgreen" },
    none: { text: "Please enter levels", olorValue: "red" },
  }),[]);  
  
  const [successRequirements, setSuccessRequirements] = useState(
    successLevel.critSuccess.text
  );
  
  const calculateRequiredSuccess = useCallback((attemptLevel, targetLevel) => {
    setDisableCheckButton(false);
    const levelDifference = targetLevel - attemptLevel;
    if (levelDifference < 0) {
      setSuccessRequirements(successLevel.failure);
    }
    if (levelDifference === 0 || levelDifference === 1) {
      setSuccessRequirements(successLevel.success);
    }
    if (levelDifference === 2 || levelDifference === 3) {
      setSuccessRequirements(successLevel.critSuccess);
    }
    if (levelDifference >= 4) {
      setSuccessRequirements(successLevel.impossible);
      setDisableCheckButton(true);
    }
  }, [successLevel]);
  
  useEffect(() => {
    if (counteractAttemptLevel === 0 || counteractTargetLevel === 0) {
      setSuccessRequirements(successLevel.none);
    } else {
      calculateRequiredSuccess(counteractAttemptLevel, counteractTargetLevel);
    }
  }, [counteractAttemptLevel, counteractTargetLevel, calculateRequiredSuccess, successLevel.none]);
  


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="message flex justify-center mb-4">
        <SuccessRequirementMessage
          text={successRequirements.text}
          color={successRequirements.colorValue}
        />
      </div>
      <div className="levels w-full flex justify-center mb-4">
        <div className="grid grid-cols-2 gap-4">
          <ItemLevelForm
            value={counteractAttemptLevel}
            setValue={setCounteractAttemptLevel}
            label="Counteract Spell Rank"
            options={{ levelOrRank: true }}
          />
          <ItemLevelForm
            value={counteractTargetLevel}
            setValue={setCounteractTargetLevel}
            label="Counteract Target Spell Rank"
            options={{ levelOrRank: true }}
          />
        </div>
      </div>
      <div className="roll-and-dc w-full flex justify-center">
        <div className="grid grid-cols-2 gap-4">
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
      <br />
      <CounteractResults 
        counteractRoll={counteractRoll}
        counteractDC={counteractDC}
        counteractAttemptLevel={counteractAttemptLevel}
        counteractTargetLevel={counteractTargetLevel}
        successRequirements={successRequirements}
        successLevel={successLevel}
        setCounteractResult={setCounteractResult}
        counteractResult={counteractResult}
        disableCheckButton={disableCheckButton}
      />
    </div>
  );
}
