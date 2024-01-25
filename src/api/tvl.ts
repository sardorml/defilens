export type ProtocolTVL = {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  tvl: number;
  url: string;
  category: string;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  change_30d: number;
};
export type ProtocolInfo = {
  id: string;
  name: string;
  description: string;
  logo: string;
  symbol: string;
  category: string;
  mcap: number;
  tvl: TVLHistoryDataPoint[];
  url: string;
  twitter: string;
  github: string;
};

export type TVLHistoryDataPoint = {
  date: number;
  [key: string]: number;
};

export async function getAllProtocols() {
  try {
    const response = await fetch("https://api.llama.fi/protocols");
    const data = await response.json();
    // remove all categories that are CEX
    const filteredData = data.filter((protocol: ProtocolTVL) => {
      return protocol.category !== "CEX";
    });
    return filteredData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getHistoricalChainTVL() {
  try {
    const response = await fetch("https://api.llama.fi/v2/historicalChainTvl");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProtocolInfo(name: string) {
  try {
    const response = await fetch(`https://api.llama.fi/protocol/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { getAllProtocols, getHistoricalChainTVL, getProtocolInfo };
