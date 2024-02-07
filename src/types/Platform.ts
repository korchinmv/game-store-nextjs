export type Station = {
  games_count: number;
  id: number;
  image: null;
  image_background: string;
  name: string;
  slug: string;
  year_end: null;
  year_start: number;
};

export type Platform = {
  platform: Station;
  released_at: string;
  requirements_en: Object;
  requirements_ru: null;
  requirements: Object;
};
