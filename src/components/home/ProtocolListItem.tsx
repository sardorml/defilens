import { Protocol } from "@/api/tvl";
import Image from "next/image";
import { formatPercentChange } from "@/helpers";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export const percentageChangeIcon = (change: number) => {
  if (change > 0) {
    return <ChevronUpIcon className="w-4 h-4 text-teal-500 font-bold" />;
  } else if (change < 0) {
    return <ChevronDownIcon className="w-4 h-4 text-rose-500 font-bold" />;
  } else {
    return <></>;
  }
};

export default function ProtocolListItem({
  protocol,
  index,
}: {
  protocol: Protocol;
  index: number;
}) {
  const percentageChangeClasses = (change: number) => {
    if (change > 0) {
      return " text-teal-500";
    } else if (change < 0) {
      return " text-rose-500";
    } else {
      return " text-slate-500";
    }
  };

  return (
    <div className="grid grid-cols-12 hover:bg-slate-100">
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-lg text-slate-600">{index}</span>
      </div>
      <div className="col-span-6 lg:col-span-4 flex items-center">
        <div className="w-10 h-10 mr-3">
          <Image
            src={protocol.logo}
            alt={protocol.name}
            width={40}
            height={40}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-slate-600">{protocol.name}</span>
          <span className="text-md text-slate-400">{protocol.category}</span>
        </div>
      </div>
      <div className="hidden lg:block col-span-2">
        <span
          className={
            "flex items-center h-full" +
            percentageChangeClasses(protocol.change_1h)
          }
        >
          {formatPercentChange(protocol.change_1h)}%
        </span>
      </div>
      <div className="hidden lg:block col-span-2">
        <span
          className={
            "flex items-center h-full" +
            percentageChangeClasses(protocol.change_1d)
          }
        >
          {formatPercentChange(protocol.change_1d)}%
        </span>
      </div>
      <div className="col-span-5 lg:col-span-3 flex flex-col text-end mr-4">
        <span className="text-lg text-slate-600">
          ${parseInt(protocol.tvl.toFixed(0)).toLocaleString()}
        </span>
        <div className="flex justify-end items-center">
          {percentageChangeIcon(protocol.change_7d)}{" "}
          <span
            className={"text-md" + percentageChangeClasses(protocol.change_7d)}
          >
            {formatPercentChange(protocol.change_7d, true)}%
          </span>
        </div>
      </div>
    </div>
  );
}
