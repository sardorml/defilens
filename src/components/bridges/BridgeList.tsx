import { numberToWord } from "@/helpers";
import Image from "next/image";
import { useState } from "react";
import { SkeletonList } from "../skeleton/SkeletonList";
import { Bridge } from "@/api/bridges";

function BridgeListItem({ bridge, index }: { bridge: Bridge; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [chainIcon, setChainIcon] = useState(false);
  const path = bridge.icon.split(":")[1];
  const jpgPath = `/icons/chains/rsz_${path}.jpg`;

  function getChains(data: string[]) {
    if (data.length > 3) return data.splice(0, 3);
    else return data;
  }
  function getChainIcon(data: string) {
    const path = data.toLocaleLowerCase();
    const jpgPath = `/icons/chains/rsz_${path}.jpg`;

    return (
      <Image
        src={chainIcon ? "/icons/0vix.png" : jpgPath}
        alt={path}
        width={24}
        height={24}
        className="rounded-full mr-2"
        onError={(e) => {
          setChainIcon(true);
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 text-lg text-slate-700 p-3 text-end hover:bg-slate-50 rounded-lg">
      <span className="text-start flex items-center">
        <span className="mr-10">{index + 1}</span>
        <span>
          <Image
            src={imageFailed ? "/icons/0vix.png" : jpgPath}
            alt={bridge.icon}
            width={24}
            height={24}
            className="rounded-full mr-2"
            onError={(e) => {
              setImageFailed(true);
            }}
          />
        </span>
        <span>{bridge.displayName}</span>
      </span>
      <span className="flex justify-end">
        {getChains(bridge.chains).map((chain) => {
          return <span key={chain}>{getChainIcon(chain)}</span>;
        })}
      </span>
      <span className="hidden lg:block">
        {numberToWord(bridge.currentDayVolume)}
      </span>
      <span className="hidden lg:block">
        {numberToWord(bridge.weeklyVolume)}
      </span>
      <span className="hidden lg:block">
        ${numberToWord(bridge.monthlyVolume)}
      </span>
    </div>
  );
}

export default function PoolList({
  data,
  isLoading,
}: {
  data: Bridge[];
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="sticky top-16 bg-white z-[8] grid grid-cols-2 lg:grid-cols-5 text-lg text-slate-500 p-3 font-medium text-end border-b border-slate-200 mb-2">
        <span className="text-start">
          <span className="mr-10">#</span>
          <span>Bridge</span>
        </span>
        <span>Chains</span>
        <span>1D volume</span>
        <span>7D volume</span>
        <span>3D volume</span>
      </div>
      {isLoading &&
        [1, 2, 3, 4, 5].map((item, index) => <SkeletonList key={index} />)}
      {data.map((item, index) => (
        <BridgeListItem key={index + item.name} bridge={item} index={index} />
      ))}
    </div>
  );
}
