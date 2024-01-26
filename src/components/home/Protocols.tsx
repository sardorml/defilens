"use client";
import { useEffect, useMemo, useState } from "react";
import { Transition } from "@headlessui/react";
import ProtocolListItem from "@/components/home/ProtocolListItem";
import { SkeletonList } from "../skeleton/SkeletonList";
import { ProtocolTVL } from "@/api/tvl";

function TableHeader() {
  return (
    <div className="grid grid-cols-12 border-b border-slate-200 mb-3 pb-2 sticky top-16 bg-white z-[9]">
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-lg text-slate-600 font-medium">#</span>
      </div>
      <div className="col-span-6 lg:col-span-4 flex items-center">
        <div className="flex flex-col">
          <span className="text-lg text-slate-600 font-medium">
            Protocol name
          </span>
          <span className="text-md text-slate-400 font-medium">Category</span>
        </div>
      </div>
      <div className="hidden lg:block col-span-2">
        <span className="flex items-center h-full font-medium">1 Hour</span>
      </div>
      <div className="hidden lg:block col-span-2">
        <span className="flex items-center h-full font-medium">1 Day</span>
      </div>
      <div className="col-span-5 lg:col-span-3 flex justify-end text-end">
        <div className="flex flex-col">
          <span className="text-lg text-slate-600 font-medium">
            Value locked
          </span>
          <span className="text-md text-slate-400 font-medium">
            7 Day change
          </span>
        </div>
        <div className="w-6 ml-3 lg:mx-5"></div>
      </div>
    </div>
  );
}

interface ProtocolsProps {
  protocols: ProtocolTVL[];
  isLoading: boolean;
}

export default function Protocols({ protocols, isLoading }: ProtocolsProps) {
  const [length, setLength] = useState(20);

  async function loadMoreData() {
    setLength((prevValue) => prevValue + 20);
  }

  function getProtocols(length: number) {
    return protocols.slice(0, length);
  }

  useEffect(() => {
    // console.log("Protocols", data);
    const handleScroll = () => {
      // Check if the user has reached the end of the screen
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Trigger the function to load more data
        loadMoreData();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // const filteredProtocols = data.filter((protocol) => {
    //   return protocol.name.toLowerCase().includes(value.toLowerCase());
    // });
    // setProtocols(filteredProtocols);
  };

  function renderProtocols() {
    return getProtocols(length).map((protocol, index) => (
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        key={protocol.id}
      >
        <ProtocolListItem protocol={protocol} index={index + 1} />
      </Transition>
    ));
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-slate-800">
          Protocol Rankings by TVL
        </h1>
        <input
          onChange={handleSearch}
          className="border border-slate-300 rounded-lg shadow-none p-2 focus:shadow-none"
          type="text"
          placeholder="Search protocol"
        />
      </div>
      <TableHeader />
      {isLoading
        ? [0, 1, 2, 3, 4].map((item) => <SkeletonList key={item} />)
        : renderProtocols()}
    </div>
  );
}
