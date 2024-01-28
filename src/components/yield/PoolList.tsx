import { ProjectYield } from "@/api/yield";
import { numberToWord } from "@/helpers";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { SkeletonList } from "../skeleton/SkeletonList";

function PoolListItem({ pool, index }: { pool: ProjectYield; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [pngTried, setPngTried] = useState(false);
  const imagePathJpg = `/icons/${pool.project
    .replace(" ", "-")
    .toLowerCase()}.jpg`;
  const imagePathPng = `/icons/${pool.project
    .replace(" ", "-")
    .toLowerCase()}.png`;

  function getImagePath() {
    if (imageFailed) return "/icons/ethereum-foundation.jpg";
    if (pngTried) return imagePathJpg;
    return imagePathPng;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-12 text-lg text-slate-700 p-3 text-end hover:bg-slate-50 rounded-lg">
      <span className="lg:col-span-4 text-start flex items-center">
        <span className="w-10">{index + 1}</span>
        <span>
          <Image
            src={getImagePath() as unknown as StaticImageData}
            alt={pool.project}
            width={32}
            height={32}
            className="rounded-lg mr-2"
            onError={(e) => {
              console.log(e);
              if (!pngTried) {
                setPngTried(true);
                setImageFailed(false);
                return;
              }
              setImageFailed(true);
            }}
          />
        </span>
        <span className="truncate">{pool.project}</span>
      </span>
      <span className="col-span-2 hidden lg:block">{pool.symbol}</span>
      <span className="col-span-2 hidden lg:block">{pool.apyBase}%</span>
      <span className="col-span-2 hidden lg:block">{pool.apyMean30d}%</span>
      <span className="lg:col-span-2">${numberToWord(pool.tvlUsd)}</span>
    </div>
  );
}

export default function PoolList({
  data,
  isLoading,
}: {
  data: ProjectYield[];
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="sticky top-16 bg-white z-[8] grid grid-cols-2 lg:grid-cols-12 text-lg text-slate-500 p-3 font-medium text-end border-b border-slate-200 mb-2">
        <span className="lg:col-span-4 flex text-start">
          <span className="w-10">#</span>
          <span>Chain</span>
        </span>
        <span className="col-span-2 hidden lg:block">Symbol</span>
        <span className="col-span-2 hidden lg:block">APY</span>
        <span className="col-span-2 hidden lg:block">APY 30d</span>
        <span className="lg:col-span-2">TVL</span>
      </div>
      {isLoading &&
        [1, 2, 3, 4, 5].map((item, index) => <SkeletonList key={index} />)}
      {!isLoading &&
        data.map((item, index) => (
          <PoolListItem key={index} pool={item} index={index} />
        ))}
    </div>
  );
}
