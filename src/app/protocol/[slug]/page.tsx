"use client";

import { ProtocolInfo, getProtocolInfo } from "@/api/tvl";
import Breadcrumb from "@/components/Breadcrumb";
import ProtocolChart from "@/components/protocol/ProtocolChart";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function ProtocolPage({ params }: { params: { slug: string } }) {
  const slug = params.slug.split("%")[0];
  const [protocol, setProtocol] = useState<ProtocolInfo>({} as ProtocolInfo); // [protocol, setProtocol
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProtocolInfo(slug).then((data) => {
      setProtocol(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <Breadcrumb
        path={["Protocols", slug]}
        activeIndex={1}
        onClick={() => {}}
      />

      <div>
        {protocol && (
          <ProtocolChart protocol={protocol} isLoading={isLoading} />
        )}
        {!protocol && (
          <div className="flex flex-col items-center justify-center mt-36 lg:flex-row">
            <InformationCircleIcon className="w-8 h-8 text-slate-400 mr-2" />
            <span className="text-slate-600 text-lg">
              Sorry, this protocol has no details currently!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
