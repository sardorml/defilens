import { Protocol } from "@/api/tvl";
import Image from "next/image";
import { formatPercentChange } from "@/helpers";

export default function ProtocolListItem({ protocol }: { protocol: Protocol }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3">
          <Image
            src={protocol.logo}
            alt={protocol.name}
            width={40}
            height={40}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-slate-600">{protocol.name}</span>
          <span className="text-md text-slate-400">{protocol.category}</span>
        </div>
      </div>
      <div className="flex flex-col text-end">
        <span className="text-lg text-slate-600">
          ${protocol.tvl.toLocaleString()}
        </span>
        <span className="text-md text-slate-400">
          {formatPercentChange(protocol.change_1h)}%
        </span>
      </div>
    </div>
  );
}
