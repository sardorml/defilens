import { ProtocolTVL } from "@/api/tvl";
import { numberToWord } from "@/helpers";

function Protocol({ protocol }: { protocol: ProtocolTVL }) {
  return (
    <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-slate-100 rounded-lg px-2">
      <div className="flex items-center">
        <div className="w-8 h-8 mr-3">
          <img src={protocol.logo} alt={protocol.name} className="rounded-lg" />
        </div>
        <div className="flex flex-col">
          <span className="text-md text-slate-600">{protocol.name}</span>
          <span className="text-sm text-slate-400">{protocol.category}</span>
        </div>
      </div>
      <span className="text-md text-slate-600">
        ${numberToWord(protocol.tvl)}
      </span>
    </div>
  );
}

export default function TopProtocolsCard({
  protocols,
}: {
  protocols: ProtocolTVL[];
}) {
  return (
    <div className="hidden lg:block h-[95%] w-80 rounded-lg mr-5 shadow-sm px-3 py-5 border border-slate-100">
      <p className="text-lg font-bold text-slate-900 mb-5">Top Protocols</p>
      <div>
        {protocols.slice(0, 5).map((protocol) => (
          <Protocol protocol={protocol} key={protocol.id} />
        ))}
      </div>
    </div>
  );
}
