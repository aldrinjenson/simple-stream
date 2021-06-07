export type Lyric = string[] | { seconds: number; lyrics: string }[];

export type thumbnail = { url: string; width: number; height: number };
export interface Song {
  type: string;
  videoId: string;
  name: string;
  url?: string;
  artist: { name: string; browseId: string };
  album: { name: string; browseId: string };
  duration: number;
  thumbnails: [thumbnail, thumbnail];
  lyrics?: Lyric;
  isTimeStamped?: boolean;
  isFavourite?: boolean;
  [x: string]: any;
}
