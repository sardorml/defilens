export type Protocol = {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  tvl: number;
  url: string;
  change_1d: number;
  change_7d: number;
  change_30d: number;
  change_90d: number;
  change_180d: number;
  change_365d: number;
  change_1y: number;
  change_all: number;
  change_30d_percent: number;
  change_90d_percent: number;
  change_180d_percent: number;
  change_365d_percent: number;
  change_1y_percent: number;
  change_all_percent: number;
  total_liquidity: number;
  total_volume: number;
  total_txns: number;
  total_users: number;
  total_supply: number;
  total_borrowed: number;
  total_collateral: number;
  total_fees: number;
  total_rewards: number;
  total_rewards_usd: number;
  total_revenue: number;
  total_revenue_usd: number;
  total_profit: number;
  total_profit_usd: number;
  total_losses: number;
  total_losses_usd: number;
  total_deposits: number;
  total_deposits_usd: number;
  total_withdrawals: number;
  total_withdrawals_usd: number;
  total_borrows: number;
  total_borrows_usd: number;
  total_redeems: number;
  total_redeems_usd: number;
  total_borrowers: number;
  total_lenders: number;
  total_traders: number;
  total_stakers: number;
  total_keepers: number;
  total_liquidators: number;
  total_insolvent_keepers: number;
  total_insolvent_liquidators: number;
  total_insolvent_borrowers: number;
  total_insolvent_lenders: number;
  total_insolvent_traders: number;
  total_insolvent_stakers: number;
  total_insolvent: number;
  total_insolvent_usd: number;
  total_liquidations: number;
  total_liquidations_usd: number;
  total_liquidations_24h: number;
  total_liquidations_24h_usd: number;
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
