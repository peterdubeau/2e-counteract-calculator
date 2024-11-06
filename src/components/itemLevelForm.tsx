/* eslint-disable react/prop-types */
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { ItemLevelProps } from "../types";

export default function ItemLevelForm({
  label,
  value,
  setValue,
  options,
}: ItemLevelProps) {
  const [isChecked, setIsChecked] = useState(false);

  function parseValue(val: string) {
    const dcValue = parseInt(val);
    if (!dcValue) {
      return setValue(0);
    }
    return setValue(dcValue);

    // none of this works. i'm getting really weird behavior where the numbers just start
    // multiplying out of control. I'm assuming I need to change the logic, so we're
    // only halving the value when we click the check results button.

    // if (!isChecked) {
    //   return setValue(dcValue);
    // }
    // const itemLevelValue = Math.floor(dcValue/2)
    // return setValue(itemLevelValue);
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked;
    setIsChecked(checked);
  }
  return (
    <div className="inline-grid grid-cols-1 gap-10">
      <div>
        <p>{label}</p>
        <input
          type="text"
          value={value}
          onChange={(e) => parseValue(e.target.value)}
        />
        {options?.levelOrRank ? (
          <div>
            <p className="flex justify-evenly">
              Use Item Level
              <input
                type="checkbox"
                name="Use Item Level"
                checked={isChecked}
                onChange={handleCheckbox}
              />
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
