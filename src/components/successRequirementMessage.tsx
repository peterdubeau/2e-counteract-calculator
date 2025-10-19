import React from "react";

type SuccessRequirementMessageProps = {
  text: string;
  color: string;
};

export default function SuccessRequirementMessage({
  color,
  text,
}: SuccessRequirementMessageProps) {
  return (
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground">Minimum Required Result:</p>
      <p className="text-xl font-bold" style={{ color: color }}>
        {text}
      </p>
    </div>
  );
}
