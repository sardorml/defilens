import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

type OptionsType = {
  name: string;
  value: string;
};

export default function ChartFilterSelector({
  options,
  handleFilterChange,
}: {
  options: OptionsType[];
  handleFilterChange: any;
}) {
  const [selected, setSelected] = useState(options[options.length - 1].value);
  function handleChange(value: string) {
    setSelected(value);
    handleFilterChange(value);
  }
  return (
    <RadioGroup
      value={selected}
      onChange={handleChange}
      className="flex bg-stone-200 rounded-lg p-1 cursor-pointer"
    >
      {options.map((option) => (
        <RadioGroup.Option
          value={option.value}
          className={({ checked }) =>
            `${checked ? "bg-stone-100 rounded-lg" : ""} px-2 py-px`
          }
          onClick={handleFilterChange}
          key={option.value}
        >
          <span className="text-sm font-medium">{option.name}</span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
