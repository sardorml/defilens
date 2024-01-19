import {
  getAllProtocols,
  getHistoricalChainTVL,
  Protocol,
  TVLHistoryDataPoint,
} from "@/api/tvl";
import TVLChart from "@/components/home/TVLChart";
import ProtocolListItem from "@/components/home/ProtocolListItem";

export default async function Home() {
  // const [protocols, setProtocols] = useState([] as Protocol[]);
  const protocols: Protocol[] = await getAllProtocols();
  const historicalTVL: TVLHistoryDataPoint[] = await getHistoricalChainTVL();
  return (
    <>
      <div className="w-full">
        <TVLChart data={historicalTVL} />
      </div>
      {protocols.map((protocol) => (
        <ProtocolListItem key={protocol.id} protocol={protocol} />
      ))}
    </>
  );
}
