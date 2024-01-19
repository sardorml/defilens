"use client";

import { Protocol } from "@/api/tvl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

const ProtocolListItem = dynamic(
  () => import("@/components/home/ProtocolListItem")
);

export default function Protocols({ data }: { data: Protocol[] }) {
  const [protocols, setProtocols] = useState(data.slice(0, 20));
  const [loading, setLoading] = useState(false);
  async function loadMoreData() {
    setLoading(true);
    setProtocols((prevProtocols) => data.slice(0, prevProtocols.length + 20));
    setLoading(false);
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
  }, [loading]);
  return (
    <div>
      {protocols.map((protocol) => (
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
          <ProtocolListItem protocol={protocol} />
        </Transition>
      ))}
    </div>
  );
}
