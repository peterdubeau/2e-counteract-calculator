import React from "react";

type ItemLevelProps = {
  label: string;
  value: number;
  setValue: any; // this is actually a hook
  levelOrRank?: boolean;
  useItemLevel?: boolean;
  setUseItemLevel?: any;
};

export default function ItemLevelForm({
  label,
  value,
  setValue,
  levelOrRank,
  useItemLevel,
  setUseItemLevel,
}: ItemLevelProps) {

  function parseValue(val: string) {
    const dcValue = parseInt(val);
    if (!dcValue) {
      setValue(0);
    } else {
      setValue(dcValue);
    }
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked;
    setUseItemLevel(checked);
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
        {levelOrRank ? (
          <div>
            <p className="flex justify-evenly">
              Use Item Level
              <input
                type="checkbox"
                name="Use Item Level"
                checked={useItemLevel}
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
