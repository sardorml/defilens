export type FeeProtocol = {
  defillamaId: string;
  name: string;
  disabled: boolean;
  displayName: string;
  module: string;
  category: string;
  logo: string;
  change_1d: number;
  change_7d: number;
  change_1m: number;
  change_7dover7d: number;
  change_30dover30d: number;
  total24h: number;
  total48hto24h: number;
  total7d: number;
  total30d: number;
  total14dto7d: number;
  total60dto30d: number;
  total1y: number;
  average1y: number;
  totalAllTime: number;
  chains: Array<string>;
  protocolType: string;
  methodologyURL: string;
  methodology: { [key: string]: string };
  parentProtocol: string;
  latestFetchIsOk: boolean;
  dailyRevenue: number;
  dailyUserFees: number;
  dailyHoldersRevenue: number;
  dailyCreatorRevenue: number;
  dailySupplySideRevenue: number;
  dailyProtocolRevenue: number;
  dailyBribesRevenue: number;
  dailyTokenTaxes: number;
  dailyFees: number;
  holdersRevenue30d: number;
  totalVolume7d: number;
  totalVolume30d: number;
};

export async function getFees() {
  try {
    const excludeTotalDataChart = "excludeTotalDataChart=true";
    const excludeTotalDataChartBreakdown =
      "excludeTotalDataChartBreakdown=true";
    const dataType = "dataType=dailyFees";

    const response = await fetch(
      "https://api.llama.fi/overview/fees?" +
        excludeTotalDataChartBreakdown +
        "&" +
        dataType
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
