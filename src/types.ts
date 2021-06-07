export type Lyric = string[] | { seconds: number; lyrics: string }[];

export type thumbnail = { url: string; width: number; height: number };
export interface Song {
  type: string;
  id: string;
  name: string;
  url?: string
  artist: { name: string; id: string };
  album: { name: string; id: string };
  duration: number;
  thumbnails: [thumbnail, thumbnail];
  lyrics?: Lyric;
  isTimeStamped: boolean;
  isFavourite?: boolean
  [x: string]: any;
}
