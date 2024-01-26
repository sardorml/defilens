export type Stablecoin = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  circulating: {
    peggedUSD: number;
  };
  circulatingPrevDay: {
    peggedUSD: number;
  };
  circulatingPrevWeek: {
    peggedUSD: number;
  };
  circulatingPrevMonth: {
    peggedUSD: number;
  };
  chainCirculating: {
    [key: string]: {
      current: {
        peggedUSD: number;
      };
      circulatingPrevDay: {
        peggedUSD: number;
      };
      circulatingPrevWeek: {
        peggedUSD: number;
      };
      circulatingPrevMonth: {
        peggedUSD: number;
      };
    };
  };
};

export async function getStablecoins() {
  try {
    const response = await fetch(
      "https://stablecoins.llama.fi/stablecoins?includePrices=true"
    );
    const data = await response.json();
    return data.peggedAssets;
  } catch (error) {
    console.log(error);
    return null;
  }
}
