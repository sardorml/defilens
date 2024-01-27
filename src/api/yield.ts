export type ProjectYield = {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number;
  apy: number;
  apyMean30d: number;
};

export async function getPools() {
  try {
    const response = await fetch("https://yields.llama.fi/pools");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
