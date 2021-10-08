import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './App';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type Action = {
  type: string;
  payload: any;
};

export type Lyric = string[] | { seconds: number; lyrics: string }[];

export type thumbnail = { url: string; width: number; height: number };
export interface Song {
  name: string;
  videoId: string;
  artist: { name: string; browseId?: string };
  duration: number;
  thumbnails: thumbnail[];
  // secondary
  type?: string;
  url?: string;
  album?: { name: string; browseId: string };
  lyrics?: Lyric;
  isTimeStamped?: boolean;
  isFavourite?: boolean;
  [x: string]: any;
}
export type FullSongProps = {
  title: string;
  thumbnails: thumbnail[];
  lengthSeconds: number;
  author?: { name: string; browseId: string };
  videoId: string;
};

export type Playlist = {
  title: string;
  canBeDeleted: boolean;
  createdAt: number;
  songs: Song[];
  id: number;
};
