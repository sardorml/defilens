// export function timestampToDateString(timestamp: number) {
//   const date = new Date(timestamp * 1000);
//   return date.getFullYear().toString();
// }

export function numberToWord(number: number) {
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

export type TVLHistoryDataPoint = {
  date: number;
  tvl: number;
};

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
