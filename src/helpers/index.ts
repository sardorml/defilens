import { TVLHistoryDataPoint } from "@/api/tvl";
export function numberToWord(number: number | undefined) {
  if (number === null || number === undefined) {
    return "0";
  }
  if (number > 1000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number > 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}

// Write a function that takes in an array of TVLHistoryDataPoint array and returns only 12 data points per year
// 1. Sort the array by date
// 2. Filter the array to only include the first data point of each month
// 3. Filter the array to only include the first data point of each year
// 4. Return the array
export function filterTVLHistoryDataPoints(data: TVLHistoryDataPoint[]) {
  const sortedData = data.sort((a, b) => a.date - b.date);
  const filteredData = sortedData.filter((dataPoint, index, array) => {
    const date = new Date(dataPoint.date * 1000);
    const nextDate = new Date(array[index + 1]?.date * 1000);
    return date.getMonth() !== nextDate.getMonth();
  });
  const filteredData2 = filteredData.filter((dataPoint, index, array) => {
    const date = new Date(dataPoint.date * 1000);
    const nextDate = new Date(array[index + 1]?.date * 1000);
    return date.getFullYear() !== nextDate.getFullYear();
  });
  return sortedData;
}
// Write a function that takes in an array of TVLHistoryDataPoint array and returns data for filter options 30 days, 90 days, 180 days
export function filterTVLHistoryDataPointsByDays(
  data: TVLHistoryDataPoint[],
  filter: string
) {
  const sortedData = data.sort((a, b) => a.date - b.date);
  const filteredData30 = sortedData.filter((dataPoint, index, array) => {
    const date = new Date(dataPoint.date * 1000);
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return date > thirtyDaysAgo;
  });
  const filteredData90 = sortedData.filter((dataPoint, index, array) => {
    const date = new Date(dataPoint.date * 1000);
    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);
    return date > ninetyDaysAgo;
  });
  const filteredData180 = sortedData.filter((dataPoint, index, array) => {
    const date = new Date(dataPoint.date * 1000);
    const today = new Date();
    const oneHundredEightyDaysAgo = new Date();
    oneHundredEightyDaysAgo.setDate(today.getDate() - 180);
    return date > oneHundredEightyDaysAgo;
  });
  const filteredData365 = sortedData.filter((dataPoint, index, array) => {
    const date = new Date(dataPoint.date * 1000);
    const today = new Date();
    const oneHundredEightyDaysAgo = new Date();
    oneHundredEightyDaysAgo.setDate(today.getDate() - 365);
    return date > oneHundredEightyDaysAgo;
  });
  if (filter === "30") {
    return filteredData30;
  } else if (filter === "90") {
    return filteredData90;
  } else if (filter === "180") {
    return filteredData180;
  } else if (filter === "365") {
    return filteredData365;
  } else {
    return sortedData;
  }
}

// Write a function that takes in an array of TVLHistoryDataPoint array and returns starting date and end date in the format of DD, MMM YYYY
export function getTVLHistoryDataPointsDateRange(data: TVLHistoryDataPoint[]) {
  if (!data || data.length === 0) {
    return "";
  }
  const sortedData = data.sort((a, b) => a.date - b.date);
  const startDate = new Date(sortedData[0].date * 1000);
  const endDate = new Date(sortedData[sortedData.length - 1].date * 1000);
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear();
  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleString("default", { month: "short" });
  const endYear = endDate.getFullYear();
  return `${startDay}, ${startMonth} ${startYear} - ${endDay}, ${endMonth} ${endYear}`;
}

// Write a function that takes in a number and returns a string with a + or - sign and returns a string with 2 decimal places and a % sign and returns 0 if it is null
export function formatPercentChange(number: number, noPrefix?: boolean) {
  if (number === null || number === undefined) {
    return "0";
  } else if (number > 0) {
    return `${noPrefix ? "" : "+"}${number.toFixed(2)}`;
  } else {
    return `${noPrefix ? Math.abs(number).toFixed(2) : number.toFixed(2)}`;
  }
}

// Write a function that takes a timestamp and returns a string with the year and month and day in the format of DD, MMM YYYY
// 1. Create a new Date object with the timestamp
// 2. Get the day, month, and year from the Date object
// 3. Return the string in the format of DD, MMM YYYY
export function timestampToDateString(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}, ${month} ${year}`;
}
// Write a function that takes in an array of TVLHistoryDataPoint array and returns percentage change for latest 24 hours, 7 days, 30 days
// 1. Get the latest data point
// 2. Get the data point from 24 hours ago
// 3. Get the data point from 7 days ago
// 4. Get the data point from 30 days ago
// 5. Calculate the percentage change for each time period
// 6. Return the array of percentage change
export function getPercentChange(data: TVLHistoryDataPoint[], filter: string) {
  if (data.length == 0) return 0;
  else {
    const sortedData = data.sort((a, b) => a.date - b.date);
    const latestDataPoint = sortedData[sortedData.length - 1].tvl;
    const dataPoint24HoursAgo = sortedData[sortedData.length - 2].tvl;
    const dataPoint7DaysAgo = sortedData[sortedData.length - 8].tvl;
    const dataPoint30DaysAgo = sortedData[sortedData.length - 31].tvl;
    const percentChange24Hours =
      (latestDataPoint / dataPoint24HoursAgo - 1) * 100;
    const percentChange7Days = (latestDataPoint / dataPoint7DaysAgo - 1) * 100;
    const percentChange30Days =
      (latestDataPoint / dataPoint30DaysAgo - 1) * 100;
    if (filter === "24h") {
      return percentChange24Hours;
    } else if (filter === "7d") {
      return percentChange7Days;
    } else if (filter === "30d") {
      return percentChange30Days;
    } else {
      return 0;
    }
  }
}

export default {
  timestampToDateString,
  numberToWord,
  filterTVLHistoryDataPoints,
  formatPercentChange,
};
