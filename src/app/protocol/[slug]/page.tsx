"use client";

import { ProtocolInfo, getProtocolInfo } from "@/api/tvl";
import Breadcrumb from "@/components/Breadcrumb";
import ProtocolChart from "@/components/protocol/ProtocolChart";
import { useEffect, useState } from "react";

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
        <ProtocolChart protocol={protocol} isLoading={isLoading} />
      </div>
    </div>
  );
}
