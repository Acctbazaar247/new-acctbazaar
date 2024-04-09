export default function hasScientificNotation(num: number) {
  // Regular expression to check for scientific notation
  const numberString = num.toString();

  return numberString.includes("e");
}
