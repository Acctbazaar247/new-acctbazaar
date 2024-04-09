// export const convertDateToString = (value: any) => {
//   const date = new Date(value);

//   return date.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };  //return as 25 Mar 2024

export const convertDateToString = (value: any) => {
  const date = new Date(value);

  // Get day with suffix
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);

  // Format date
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Format time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate.replace(
    /\b(\d{1,2})\b/g,
    "$1" + daySuffix
  )}, ${formattedTime}`;
};

// Function to get day suffix (e.g., 'st', 'nd', 'rd', 'th')
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
