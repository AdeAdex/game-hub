// /app/utils/generatePrices.ts

export const generateRandomPrices = (count: number): number[] => {
        return Array.from({ length: count }, () => {
          // Generate a random price between $5 and $60 with 2 decimal places
          return parseFloat((Math.random() * (60 - 5) + 5).toFixed(2));
        });
      };
      