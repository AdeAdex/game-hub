// /types/homePage/games/index.tsx

export interface AddedByStatus {
        yet: number;
        owned: number;
        beaten: number;
        toplay: number;
        dropped: number;
        playing: number;
      }
      
      export interface EsrbRating {
        id: number;
        name: string;
        slug: string;
      }
      
      export interface Genre {
        id: number;
        name: string;
        slug: string;
      }
      
      export interface PlatformDetails {
        games_count: number;
        id: number;
        image: string | null;
        image_background: string;
        name: string;
        slug: string;
        year_end: number | null;
        year_start: number | null;
      }
      
      export interface Platform {
        platform: PlatformDetails;
        released_at: string;
      }
      
      export interface ParentPlatform {
        platform: PlatformDetails;
      }
      
      export interface Rating {
        id: number;
        title: string;
        count: number;
        percent: number;
      }
      
      export interface Screenshot {
        id: number;
        image: string;
      }
      
      export interface StoreDetails {
        id: number;
        name: string;
        slug: string;
        domain: string; // Assuming domain is part of the store details
      }
      
      export interface Store {
        id: number;
        store: StoreDetails;
      }
      
      export interface Tag {
        games_count: number;
        id: number;
        image_background: string;
        language: string;
        name: string;
        slug: string;
      }
      
      export interface Game {
        added: number;
        added_by_status: AddedByStatus;
        background_image: string;
        clip: string | null;
        dominant_color: string;
        esrb_rating: EsrbRating;
        genres: Genre[];
        id: number;
        metacritic: number;
        name: string;
        parent_platforms: ParentPlatform[];
        platforms: Platform[];
        playtime: number;
        rating: number;
        rating_top: number;
        ratings: Rating[];
        ratings_count: number;
        released: string;
        reviews_count: number;
        reviews_text_count: number;
        saturated_color: string;
        short_screenshots: Screenshot[];
        slug: string;
        stores: Store[];
        suggestions_count: number;
        tags?: Tag[];
      }
      