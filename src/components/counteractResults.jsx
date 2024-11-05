/* eslint-disable react/prop-types */
export default function CounteractResults({
  counteractRoll,
  counteractDC,
  successLevel,
  successRequirements,
  setCounteractResult,
  counteractResult,
  disableCheckButton,
}) {
  function handleResult() {
    switch (successRequirements.text) {
      case successLevel.success.text:
        if (counteractRoll >= counteractDC) {
          setCounteractResult(true);
        } else {
          setCounteractResult(false);
        }
        break;

      case successLevel.critSuccess.text:
        if (counteractRoll >= counteractDC + 10) {
          setCounteractResult(true);
        } else {
          setCounteractResult(false);
        }
        break;
      case successLevel.failure.text:
        if (counteractRoll >= counteractDC - 10) {
          setCounteractResult(true);
        } else {
          setCounteractResult(false);
        }
        break;

      case successLevel.impossible.text:
        setCounteractResult(false);
    }
  }

  return (
    <>
      <button onClick={() => handleResult()} disabled={disableCheckButton}>
        Did the counteract work???
      </button>
      {counteractResult ? "Success!" : "Failure"}
    </>
  );
}
