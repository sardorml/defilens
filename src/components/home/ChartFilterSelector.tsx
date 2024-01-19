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
      className="flex bg-teal-200 rounded-lg p-1 cursor-pointer"
    >
      {options.map((option) => (
        <RadioGroup.Option
          value={option.value}
          className={({ checked }) =>
            `${checked ? "bg-teal-100 rounded-lg" : ""} px-3 py-1`
          }
          onClick={handleFilterChange}
          key={option.value}
        >
          <span className="text-md">{option.name}</span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
