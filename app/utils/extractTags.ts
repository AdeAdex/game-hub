// utils/extractTags.ts

// import { Game } from "../types/homePage/games";

// // Function to extract unique tags from games data
// export const extractTags = (games: Game[]): { allTags: { title: string }[], popularTags: { title: string }[] } => {
//   // Use a Map to keep track of tag frequencies
//   const tagMap = new Map<string, number>();

//   games.forEach((game) => {
//     if (game.tags) {
//       game.tags.forEach((tag) => {
//         const tagName = tag.name;
//         // Increment the tag count or initialize it to 1 if it's new
//         tagMap.set(tagName, (tagMap.get(tagName) || 0) + 1);
//       });
//     }
//   });

//   // Convert Map to an array of objects with a title property for all tags
//   const allTags = Array.from(tagMap.keys()).map((tag) => ({ title: tag }));

//   // Sort tags by frequency in descending order and get the top 15
//   const popularTags = Array.from(tagMap.entries())
//     .sort((a, b) => b[1] - a[1]) // Sort by frequency
//     .slice(0, 16) // Get top 15
//     .map(([tag]) => ({ title: tag }));

//   return { allTags, popularTags };
// };



import { Game } from "../types/homePage/games";

// Function to extract unique tags from games data
export const extractTags = (games: Game[]): { allTags: { name: string }[], popularTags: { name: string }[] } => {
  // Use a Map to keep track of tag frequencies
  const tagMap = new Map<string, number>();

  games.forEach((game) => {
    if (game.tags) {
      game.tags.forEach((tag) => {
        const tagName = tag.name;
        // Increment the tag count or initialize it to 1 if it's new
        tagMap.set(tagName, (tagMap.get(tagName) || 0) + 1);
      });
    }
  });

  // Convert Map to an array of objects with a name property for all tags
  const allTags = Array.from(tagMap.keys()).map((tag) => ({ name: tag }));

  // Sort tags by frequency in descending order, filter by length <= 12 characters, and get the top 15
  const popularTags = Array.from(tagMap.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .filter(([tag]) => tag.length <= 12) // Filter tags with length <= 12
    .slice(0, 16) // Get top 15
    .map(([tag]) => ({ name: tag }));

  return { allTags, popularTags };
};
