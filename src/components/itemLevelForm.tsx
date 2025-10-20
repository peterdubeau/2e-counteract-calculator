import React, { useState } from "react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type ItemLevelProps = {
  label: string;
  value: number;
  setValue: any; // this is actually a hook
  levelOrRank?: boolean;
  useItemLevel?: boolean;
  setUseItemLevel?: any;
  placeholder?: string;
};

export default function ItemLevelForm({
  label,
  value,
  setValue,
  levelOrRank,
  useItemLevel,
  setUseItemLevel,
  placeholder,
}: ItemLevelProps) {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(val: string) {
    setInputValue(val);
    if (val === '') {
      setValue(0);
    } else {
      const numValue = parseInt(val);
      if (isNaN(numValue)) {
        setValue(0);
      } else {
        setValue(numValue);
      }
    }
  }

  function getDisplayValue() {
    return inputValue;
  }

  function getPlaceholderText() {
    if (levelOrRank && useItemLevel !== undefined) {
      return useItemLevel ? "Enter Item Level" : "Enter Spell Rank";
    }
    return placeholder || "Enter level";
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
        {levelOrRank ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={getDisplayValue()}
              onChange={(e) => handleInputChange(e.target.value)}
              className="flex-1 h-12 px-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg min-w-0"
              placeholder={getPlaceholderText()}
            />
            <div className="flex items-center gap-1 px-2 py-3 bg-muted rounded-lg flex-shrink-0">
              <span className="text-xs font-medium text-foreground whitespace-nowrap">Item Level</span>
              <Switch
                name="Use Item Level"
                checked={useItemLevel}
                onCheckedChange={(e) => handleCheckbox(e)}
              />
            </div>
          </div>
        ) : (
          <input
            type="number"
            value={getDisplayValue()}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            placeholder={getPlaceholderText()}
          />
        )}
      </div>
    </div>
  );
}
