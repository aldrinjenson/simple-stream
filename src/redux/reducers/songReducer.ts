import { Song } from '../../types';
import {
  GET_RELATED_SONGS_START,
  GET_RELATED_SONGS_SUCCESS,
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
  SET_SONG_QUEUE,
} from '../constants';
interface InitialState {
  isPlaying: boolean;
  currentSong: Song | null;
  currentSongStatus: any;
  songQueue: Song[];
  isRelatedSongsLoading: boolean;
  seekPosition: 0;
}
const initialState: InitialState = {
  isPlaying: false,
  currentSong: null,
  currentSongStatus: {},
  songQueue: [],
  isRelatedSongsLoading: false,
  seekPosition: 0,
};
type Action = {
  type: string;
  payload: any;
};

const songReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_SONG:
      return { ...state, currentSong: payload };

    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
      };
    case GET_RELATED_SONGS_START:
      return {
        ...state,
        isRelatedSongsLoading: true,
        songQueue: [],
      };
    case GET_RELATED_SONGS_SUCCESS:
    case SET_SONG_QUEUE:
      return {
        ...state,
        songQueue: [...payload], // to skip shallow comparison for allow re-renders
        isRelatedSongsLoading: false,
      };
    case SET_SEEK_POSITION:
      return {
        ...state,
        seekPosition: payload,
      };
    default:
      return state;
  }
};

export default songReducer;
