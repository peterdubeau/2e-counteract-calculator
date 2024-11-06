import React from "react";
import { SuccessRequirementMessageProps } from "../types";

export default function SuccessRequirementMessage({ color, text }: SuccessRequirementMessageProps) {
  return (
    <div className="flex justify-center flex-col items-center">
      <p>Minimum Required Result:</p>
      <p style={{ color: color }}>{text}</p>
    </div>
  );
}
