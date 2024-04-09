export default function getDaysRemaining(updatedAtString: string): number {
  // Convert the updatedAt string to a Date object
  const updatedAt = new Date(updatedAtString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and updatedAt date
  const differenceMs = currentDate.getTime() - updatedAt.getTime();

  // Convert milliseconds to days
  const daysPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  // Calculate days remaining based on the condition
  let daysRemaining = 7 - daysPassed;
  if (daysRemaining < 0) {
    daysRemaining = 0;
  }

  return daysRemaining;
}
