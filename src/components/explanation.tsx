import React from "react";
import { ExplanationProps } from "../types";

export default function Explanation ({text, color}: ExplanationProps) {
  return(
    <div style={{color: color}}>
      This counteract check was **STATUS**
      The The counteracting action was **X** levels **HIGHER/LOWER** than the targeted effect.
      Because the counteracting action was **RANGE** levels **HIGHER/LOWER** than the targeted effect, a **SUCCESS LEVEL** roll was required
    </div>
  )
}