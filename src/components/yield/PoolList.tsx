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
    if (imageFailed) return "/icons/0vix.png";
    if (pngTried) return imagePathJpg;
    return imagePathPng;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 text-lg text-slate-700 p-3 text-end hover:bg-slate-50 rounded-lg">
      <span className="text-start flex items-center">
        <span className="mr-10">{index + 1}</span>
        <span>
          <Image
            src={getImagePath() as unknown as StaticImageData}
            alt={pool.project}
            width={24}
            height={24}
            className="rounded-full mr-2"
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
        <span>{pool.project}</span>
      </span>
      <span>{pool.symbol}</span>
      <span className="hidden lg:block">{pool.apyBase}</span>
      <span className="hidden lg:block">{pool.apyMean30d}</span>
      <span className="hidden lg:block">${numberToWord(pool.tvlUsd)}</span>
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
      <div className="sticky top-16 bg-white z-[8] grid grid-cols-2 lg:grid-cols-5 text-lg text-slate-500 p-3 font-medium text-end border-b border-slate-200 mb-2">
        <span className="text-start">
          <span className="mr-10">#</span>
          <span>Chain</span>
        </span>
        <span>Symbol</span>
        <span>APY</span>
        <span>APY 30d</span>
        <span>TVL</span>
      </div>
      {isLoading &&
        [1, 2, 3, 4, 5].map((item, index) => <SkeletonList key={index} />)}
      {data.map((item, index) => (
        <PoolListItem key={index} pool={item} index={index} />
      ))}
    </div>
  );
}
