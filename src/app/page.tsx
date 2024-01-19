import {
  getAllProtocols,
  getHistoricalChainTVL,
  Protocol,
  TVLHistoryDataPoint,
} from "@/api/tvl";
import Protocols from "@/components/home/Protocols";
import ChartArea from "@/components/home/ChartArea";
import { numberToWord } from "@/helpers";

export default async function Home() {
  // const [protocols, setProtocols] = useState([] as Protocol[]);
  const protocols: Protocol[] = await getAllProtocols();
  const historicalTVL: TVLHistoryDataPoint[] = await getHistoricalChainTVL();

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-slate-700 mb-10">
            Value Locked
          </h1>
          <span className="text-3xl font-bold text-slate-700">
            ${numberToWord(historicalTVL[historicalTVL.length - 1].tvl)}
          </span>
        </div>

        <ChartArea data={historicalTVL} />
      </div>
      <Protocols data={protocols} />
    </>
  );
}
