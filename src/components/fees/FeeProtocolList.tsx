import { formatPercentChange, numberToWord } from "@/helpers";
import Image from "next/image";
import { SkeletonList } from "../skeleton/SkeletonList";
import { FeeProtocol } from "@/api/fees";
import { BookmarkIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { percentageChangeIcon } from "../home/ProtocolListItem";
import { percentageChangeClasses } from "../home/ProtocolListItem";
import { useState } from "react";

function FeeProtocolListItem({
  protocol,
  index,
}: {
  protocol: FeeProtocol;
  index: number;
}) {
  const [isImageFailed, setIsImageFailed] = useState(false);
  return (
    <div className="grid grid-cols-12 hover:bg-slate-100 rounded-lg">
      <div className="col-span-6 lg:col-span-5 flex items-center">
        <span className="text-lg text-slate-600 mx-5">{index}</span>

        <div className="w-10 h-10 mr-3">
          <Image
            src={
              isImageFailed ? "/icons/ethereum-foundation.jpg" : protocol.logo
            }
            alt={protocol.name}
            width={40}
            height={40}
            className="rounded-lg"
            loading="lazy"
            onError={(e) => {
              setIsImageFailed(true);
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-slate-600">{protocol.name}</span>
          <span className="text-md text-slate-400">{protocol.category}</span>
        </div>
      </div>
      <div className="hidden lg:block col-span-2">
        <span className={"flex items-center h-full text-lg text-slate-600"}>
          {numberToWord(protocol.total7d)}
        </span>
      </div>
      <div className="hidden lg:block col-span-2">
        <span className={"flex items-center h-full text-lg text-slate-600"}>
          {numberToWord(protocol.total30d)}
        </span>
      </div>
      <div className="col-span-6 lg:col-span-3 flex items-center justify-end">
        <div className="flex flex-col text-end">
          <span className="text-lg text-slate-600">
            {numberToWord(protocol.total24h)}
          </span>
          <div className="flex justify-end items-center text-base">
            {percentageChangeIcon(protocol.change_1d)}{" "}
            <span className={percentageChangeClasses(protocol.change_1d)}>
              {formatPercentChange(protocol.change_1d, true)}%
            </span>
          </div>
        </div>
        {/* <Link href={"/protocol/" + protocol.name}> */}
        <ChevronRightIcon className="w-6 h-6 text-slate-500 ml-3 lg:mx-5 cursor-pointer" />
        {/* </Link> */}
      </div>
    </div>
  );
}

export default function FeeProtocolList({
  data,
  isLoading,
}: {
  data: FeeProtocol[];
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="grid grid-cols-12 border-b border-slate-200 mb-3 pb-2 sticky top-16 bg-white z-[9]">
        <div className="col-span-6 lg:col-span-5 flex items-center">
          <span className="text-lg text-slate-600 font-medium mx-5">#</span>

          <div className="flex flex-col">
            <span className="text-lg text-slate-600 font-medium">
              Protocol name
            </span>
            <span className="text-md text-slate-400 font-medium">Category</span>
          </div>
        </div>
        <div className="hidden lg:block col-span-2">
          <span className="flex items-center h-full font-medium">7D</span>
        </div>
        <div className="hidden lg:block col-span-2">
          <span className="flex items-center h-full font-medium">30D</span>
        </div>
        <div className="col-span-6 lg:col-span-3 flex justify-end text-end items-center">
          <div className="flex flex-col">
            <span className="text-lg text-slate-600 font-medium">Fee 24h</span>
            <span className="text-md text-slate-400 font-medium">% 24h</span>
          </div>
          <div className="w-6 ml-3 lg:mx-5"></div>
        </div>
      </div>
      {isLoading &&
        [1, 2, 3, 4, 5].map((item, index) => <SkeletonList key={index} />)}
      {!isLoading &&
        data.map((item, index) => (
          <FeeProtocolListItem
            key={index + item.name}
            protocol={item}
            index={index + 1}
          />
        ))}
    </div>
  );
}
