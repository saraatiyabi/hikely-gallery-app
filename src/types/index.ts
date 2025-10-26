// src/types/index.ts
export interface HikingImage {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  thumb: string;
  full: string;
  likes?: number;
  downloads?: number;
  author?: {
    username: string;
    avatar?: string;
  };
  resolution?: string;
}
