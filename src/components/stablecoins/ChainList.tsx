import { Stablecoin } from "@/api/stablecoins";
import { numberToWord } from "@/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ChainListItemProps {
  name: string;
  index: number;
  value: Stablecoin["chainCirculating"][string];
}

function ChainListItem({ name, index, value }: ChainListItemProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imagePath = `/icons/chains/rsz_${name
    .replace(" ", "-")
    .toLowerCase()}.jpg`;

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-5 text-lg text-slate-700 p-3 text-end hover:bg-slate-50 rounded-lg"
      key={name}
    >
      <span className="text-start flex items-center">
        <span className="mr-10">{index + 1}</span>
        <span>
          <Image
            src={imageFailed ? "/icons/0vix.png" : imagePath}
            alt={name}
            width={24}
            height={24}
            className="rounded-full mr-2"
            onError={(e) => {
              console.log(e);
              setImageFailed(true);
            }}
          />
        </span>
        <span>{name}</span>
      </span>
      <span>${numberToWord(value.current.peggedUSD)}</span>
      <span className="hidden lg:block">
        ${numberToWord(value.circulatingPrevDay.peggedUSD)}
      </span>
      <span className="hidden lg:block">
        ${numberToWord(value.circulatingPrevWeek.peggedUSD)}
      </span>
      <span className="hidden lg:block">
        ${numberToWord(value.circulatingPrevMonth.peggedUSD)}
      </span>
    </div>
  );
}

interface ChainListProps {
  data: Stablecoin["chainCirculating"];
}

export default function ChainList({ data }: ChainListProps) {
  const chainCirculating = Object.entries(data);
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-5">
        Chain circulating
      </h1>
      <div className="sticky top-16 bg-white z-[9] grid grid-cols-2 lg:grid-cols-5 text-lg text-slate-500 p-3 font-medium text-end border-b border-slate-200 mb-2">
        <span className="text-start">
          <span className="mr-10">#</span>
          <span>Chain</span>
        </span>
        <span>Current</span>
        <span className="hidden lg:block">Prev Day</span>
        <span className="hidden lg:block">Prev Week</span>
        <span className="hidden lg:block">Prev Month</span>
      </div>
      {chainCirculating.map(([key, value], index) => (
        <ChainListItem name={key} index={index} value={value} key={key} />
      ))}
    </div>
  );
}
