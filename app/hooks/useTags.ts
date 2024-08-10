// hooks/useTags.ts
import { useState, useEffect } from 'react';
import { Game } from '../types/homePage/games';
import { extractTags } from '../utils/extractTags';

const useTags = (games: Game[]) => {
  const [allTags, setAllTags] = useState<{ name: string }[]>([]);
  const [popularTags, setPopularTags] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (games.length > 0) {
      const { allTags, popularTags } = extractTags(games);
      setAllTags(allTags);
      setPopularTags(popularTags);
//       console.log("alltags",allTags)
    }
  }, [games]);

  return { allTags, popularTags };
};

export default useTags;
