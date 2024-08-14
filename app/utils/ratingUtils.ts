// src/utils/ratingUtils.ts

export interface RatingRange {
  min: number;
  max: number;
  label: string; // Display label for the rating range
}

export const generateRatingRanges = (ratings: number[]): RatingRange[] => {
  if (ratings.length === 0) {
    return [];
  }

  // Remove duplicates and sort the ratings in ascending order
  const uniqueRatings = Array.from(new Set(ratings)).sort((a, b) => a - b);
  const ranges: RatingRange[] = [];

  // Define the interval for each range
  const interval = 0.5;

  // Initialize the start and end of the first range
  let start = uniqueRatings[0];
  let end = start + interval;

  for (let i = 0; i < uniqueRatings.length; i++) {
    const current = uniqueRatings[i];
    const next = uniqueRatings[i + 1];

    // If the next rating doesn't fall within the current range, finalize this range
    if (next === undefined || next > end) {
      ranges.push({
        min: start,
        max: end,
        label: `${start.toFixed(1)} - ${end.toFixed(1)}`,
      });

      // Start a new range
      start = end;
      end = start + interval;
    }
  }

  return ranges;
};
