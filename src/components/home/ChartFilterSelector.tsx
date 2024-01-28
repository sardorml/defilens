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
      className="flex bg-slate-200 rounded-lg p-1 cursor-pointer w-fit"
    >
      {options.map((option) => (
        <RadioGroup.Option
          value={option.value}
          className={({ checked }) =>
            `${checked ? "bg-slate-50 rounded-lg" : ""} px-2 py-px`
          }
          onClick={handleFilterChange}
          key={option.value}
        >
          <span className="text-sm font-medium text-slate-900">
            {option.name}
          </span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
