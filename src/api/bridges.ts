export type Bridge = {
  id: number;
  name: string;
  displayName: string;
  icon: string;
  volumePrevDay: number;
  volumePrev2Day: number;
  lastHourlyVolume: number;
  currentDayVolume: number;
  lastDailyVolume: number;
  dayBeforeLastVolume: number;
  weeklyVolume: number;
  monthlyVolume: number;
  chains: Array<string>;
  destinationChain: string;
};

export async function getBridges() {
  try {
    const response = await fetch("https://bridges.llama.fi/bridges");
    const data = await response.json();
    return data.bridges;
  } catch (error) {
    console.log(error);
    return null;
  }
}
