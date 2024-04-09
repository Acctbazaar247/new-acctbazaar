export const optionCreator = (single: string) => ({
  label: single.split("_").join(" ").toLowerCase(),
  value: single,
});

export const normalizeScrollValue = (
  smoothedScrollY: number,
  minValue: number,
  maxValue: number
): number => {
  // Ensure that the value is within the specified range (minValue to maxValue)
  const clampedValue = Math.min(Math.max(smoothedScrollY, minValue), maxValue);

  // Calculate the normalized value between 0 and 1
  const normalizedValue = (clampedValue - minValue) / (maxValue - minValue);

  return normalizedValue;
};
export const isValidURL = (url: string): boolean => {
  // Regular expression for URL validation
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return urlPattern.test(url);
};
