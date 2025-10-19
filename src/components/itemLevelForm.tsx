import React from "react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
    if (isNaN(dcValue) || val === '') {
      setValue(0);
    } else {
      setValue(dcValue);
    }
  }

  function handleCheckbox(e: any): void {
    const checked = e;
    console.log(checked)
    setUseItemLevel(checked);
  }
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          {label} {levelOrRank ? (useItemLevel ? "Item Level" : "Spell Rank") : ""}
        </label>
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => parseValue(e.target.value)}
          className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
          placeholder="Enter level"
        />
      </div>
      {levelOrRank && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium text-foreground">Use Item Level</span>
          <Switch
            name="Use Item Level"
            checked={useItemLevel}
            onCheckedChange={(e) => handleCheckbox(e)}
          />
        </div>
      )}
    </div>
  );
}
