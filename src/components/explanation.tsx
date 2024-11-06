import React from "react";
import { ExplanationProps } from "../types";

export default function Explanation ({text, color}: ExplanationProps) {
  return(
    <div style={{color: color}}>
      {text}
    </div>
  )
}