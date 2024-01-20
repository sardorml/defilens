import { RadioGroup } from "@headlessui/react";

type OptionsType = {
  name: string;
  value: string;
};

export default function ChartFilterSelector({
  options,
  selected,
  handleFilterChange,
}: {
  options: OptionsType[];
  selected: string;
  handleFilterChange: any;
}) {
  return (
    <RadioGroup
      value={selected}
      onChange={handleFilterChange}
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
