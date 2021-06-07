export type Lyric = string[] | { seconds: number; lyrics: string }[];

export type thumbnail = { url: string; width: number; height: number };
export interface Song {
  name: string;
  videoId: string;
  artist: { name: string; browseId?: string };
  duration: number;
  thumbnails: [thumbnail, thumbnail];
  // secondary
  type: string;
  url?: string;
  album?: { name: string; browseId: string };
  lyrics?: Lyric;
  isTimeStamped?: boolean;
  isFavourite?: boolean;
  [x: string]: any;
}
