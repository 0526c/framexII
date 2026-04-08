export type CreatorIdentity = 
  | "video" 
  | "ad" 
  | "short" 
  | "tv" 
  | "film";

export type VisualStyle = "film" | "cool" | "warm" | "noir";

export type Genre = "romance" | "thriller" | "drama" | "scifi";

export interface StoryConfig {
  identity: CreatorIdentity;
  identityName: string;
  style: VisualStyle;
  styleName: string;
  genre: Genre;
  genreName: string;
  duration: number;
  durationName: string;
}

export interface Shot {
  id: number;
  number: string;
  description: string;
  movement: string;
  imageUrl?: string;
}

export interface ScriptScene {
  scene?: string;
  action?: string;
  character?: string;
  dialog?: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  credits: number;
  tier: "starter" | "pro" | "studio";
  projects: number;
}
