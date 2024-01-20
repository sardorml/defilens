"use client";

import { Protocol } from "@/api/tvl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import ProtocolListItem from "@/components/home/ProtocolListItem";
import SkeletonList from "../skeleton/SkeletonList";

export default function Protocols({ data }: { data: Protocol[] }) {
  const [protocols, setProtocols] = useState(data.slice(0, 20));
  const [isLoading, setIsLoading] = useState(true);
  // Simulate loading
  setTimeout(() => {
    setIsLoading(false);
  }, 100);

  async function loadMoreData() {
    setProtocols((prevProtocols) => data.slice(0, prevProtocols.length + 20));
  }

  useEffect(() => {
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
    return protocols.map((protocol, index) => (
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
      <div className="grid grid-cols-12 border-b border-slate-200 mb-3 pb-2 sticky top-20 bg-white">
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
        <div className="col-span-5 lg:col-span-3 flex flex-col text-end mr-4">
          <span className="text-lg text-slate-600 font-medium">
            Value locked
          </span>
          <span className="text-md text-slate-400 font-medium">
            7 Day change
          </span>
        </div>
      </div>
      {isLoading
        ? [0, 1, 2, 3, 4].map((item) => <SkeletonList key={item} />)
        : renderProtocols()}
    </div>
  );
}
