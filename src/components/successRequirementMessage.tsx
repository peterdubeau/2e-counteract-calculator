import React from "react";
import { SuccessRequirementMessageProps } from "../types";
/* eslint-disable react/prop-types */
export default function SuccessRequirementMessage({ color, text }: SuccessRequirementMessageProps) {
  console.log({color, text})
  return (
    <div className="flex justify-center flex-col items-center">
      <p>Minimum Required Result:</p>
      <p style={{ color: color }}>{text}</p>
    </div>
  );
}
