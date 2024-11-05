/* eslint-disable react/prop-types */
export default function SuccessRequirementMessage({ text, color }) {
  return (
    <div className="flex justify-center flex-col items-center">
      <p>Minimum Required Result:</p>
      <p style={{ color: color }}>{text}</p>
    </div>
  );
}
