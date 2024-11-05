import { useState } from "react";

export default function Form() {
  const [counteractAttemptLevel, setCounteractAttemptLevel] = useState(1);
  const [counteractTargetLevel, setCounteractTargetLevel] = useState(1);
  const [counteractDC, setCounteractDC] = useState(10);
  const [counteractRoll, setCounteractRoll] = useState(0);
  const [counteractResult, setCounteractResult] = useState(false);

  const successLevel = {
    critSuccess: 3,
    success: 2,
    failure: 1,
    critFailure: 0,
  };

  function doSomeMath(params) {
    switch (params) {
      case counteractAttemptLevel >= counteractTargetLevel:
        this;
    }
  }
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <div>
        <p>counteract attempt level</p>
        <input
          value={counteractAttemptLevel}
          onChange={(e) => setCounteractAttemptLevel(e.target.value)}
          label="hello"
        />
      </div>
      <div>
        <input
          value={counteractTargetLevel}
          onChange={(e) => setCounteractTargetLevel(e.target.value)}
        />
      </div>
      <div>
        <input
          value={counteractDC}
          onChange={(e) => setCounteractDC(e.target.value)}
        />
      </div>
      <div>
        <input
          value={counteractDC}
          onChange={(e) => setCounteractDC(e.target.value)}
        />
      </div>
      <div>
        <input
          value={counteractRoll}
          onChange={(e) => setCounteractRoll(e.target.value)}
        />
        <button onClick={() => console.log(counteractAttemptLevel)}>
          Increment age
        </button>
        <p>1. {counteractAttemptLevel}</p>
      </div>
    </div>
  );
}
