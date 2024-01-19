export type Protocol = {
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

export type TVLHistoryDataPoint = {
  date: number;
  tvl: number;
};

export async function getAllProtocols() {
  const response = await fetch("https://api.llama.fi/protocols");
  const data = await response.json();
  return data;
}

export async function getHistoricalChainTVL() {
  const response = await fetch("https://api.llama.fi/v2/historicalChainTvl");
  const data = await response.json();
  return data;
}

export default { getAllProtocols, getHistoricalChainTVL };
