import { ChevronRightIcon } from "@heroicons/react/16/solid";

export default function Breadcrumb({
  path,
  activeIndex,
  onClick,
}: {
  path: string[];
  activeIndex: number;
  onClick: (index: number) => void;
}) {
  const activeClasses = (index: number) => {
    if (index === activeIndex) {
      return " text-slate-700 font-medium";
    } else {
      return " text-slate-500";
    }
  };
  return (
    <div className="flex items-center">
      {path.map((item, index) => (
        <div className="flex items-center" key={index}>
          <span className={"text-md" + activeClasses(index)}>{item}</span>
          {index !== path.length - 1 && (
            <ChevronRightIcon className="h-5 w-5 text-slate-500 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
