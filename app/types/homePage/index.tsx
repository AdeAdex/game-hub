  // app/types/homepage/index.tsx

  export interface HomeHero {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  export interface HomeHeroProps {
    contents: HomeHero[];
  }
