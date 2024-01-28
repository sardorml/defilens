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
        src={chainIcon ? "/icons/ethereum-foundation.jpg" : jpgPath}
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
    <div className="grid grid-cols-2 lg:grid-cols-12 text-lg text-slate-700 p-3 text-end hover:bg-slate-50 rounded-lg">
      <span className="text-start flex items-center lg:col-span-4">
        <span className="w-10">{index + 1}</span>
        <span className="mr-5">
          <Image
            src={imageFailed ? "/icons/ethereum-foundation.jpg" : jpgPath}
            alt={bridge.icon}
            width={32}
            height={32}
            className="rounded-lg"
            onError={(e) => {
              setImageFailed(true);
            }}
          />
        </span>
        <span className="">{bridge.displayName}</span>
      </span>
      <div className="col-span-2 hidden lg:block ">
        <span className="flex justify-end ">
          {getChains(bridge.chains).map((chain) => {
            return <span key={chain}>{getChainIcon(chain)}</span>;
          })}
        </span>
      </div>
      <span className="hidden lg:block col-span-2">
        ${numberToWord(bridge.currentDayVolume)}
      </span>
      <span className="hidden lg:block col-span-2">
        ${numberToWord(bridge.weeklyVolume)}
      </span>
      <span className="lg:col-span-2">
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
      <div className="sticky top-16 bg-white z-[8] grid grid-cols-2 lg:grid-cols-12 text-lg text-slate-500 p-3 font-medium text-end border-b border-slate-200 mb-2">
        <span className="text-start lg:col-span-4 flex">
          <span className="w-10">#</span>
          <span className="">Bridge</span>
        </span>
        <span className="col-span-2 hidden lg:block">Chains</span>
        <span className="col-span-2 hidden lg:block">1D volume</span>
        <span className="col-span-2 hidden lg:block">7D volume</span>
        <span className="lg:col-span-2">30D volume</span>
      </div>
      {isLoading &&
        [1, 2, 3, 4, 5].map((item, index) => <SkeletonList key={index} />)}
      {!isLoading &&
        data.map((item, index) => (
          <BridgeListItem key={index + item.name} bridge={item} index={index} />
        ))}
    </div>
  );
}
