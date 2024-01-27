import { getAllProtocols, getProtocolInfo } from "@/api/tvl";
import { get } from "http";

export default async function Bridges() {
  const res = await getAllProtocols();
  console.log(res);
  return <div>fees</div>;
}
