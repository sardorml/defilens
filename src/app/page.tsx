import { getAllProtocols, Protocol } from "@/api/tvl";
import ChartTVL from "@/components/home/ChartTVL";
import Protocols from "@/components/home/Protocols";

export default async function Home() {
  const protocols: Protocol[] = await getAllProtocols();
  const topProtocols = protocols.slice(0, 5);
  return (
    <>
      <ChartTVL topProtocols={topProtocols} />
      <Protocols data={protocols} />
    </>
  );
}
