//  /app/types/homePage/game-details/index.ts

export interface Platform {
  id: number;
  slug: string;
  name: string;
}

export interface EsrbRating {
  id: number;
  slug: string;
  name: string;
}

export interface MetacriticPlatform {
  metascore: number;
  url: string;
}

export interface Developer {
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  image_background: string;
  name: string;
}

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  description_raw: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatform[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Record<string, unknown>;
  reactions: Record<string, unknown>;
  added: number;
  added_by_status: Record<string, unknown>;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: string;
  ratings_count: number;
  suggestions_count: number;
  developers: Developer[];
  genres: Genre[];
  publishers: Publisher[];
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  esrb_rating: EsrbRating;
  platforms: {
    platform: Platform;
    released_at: string;
    requirements: {
      minimum: string;
      recommended: string;
    };
  }[];
}
