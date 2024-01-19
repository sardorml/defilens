import { TVLHistoryDataPoint } from "@/api/tvl";
export function numberToWord(number: number | undefined) {
  if (number === undefined) {
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
  console.log("filter helper", filter);
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
export function formatPercentChange(number: number) {
  if (number === null) {
    return "0";
  }
  if (number > 0) {
    return `+${number.toFixed(2)}`;
  } else {
    return `${number.toFixed(2)}`;
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

export default {
  timestampToDateString,
  numberToWord,
  filterTVLHistoryDataPoints,
  formatPercentChange,
};
