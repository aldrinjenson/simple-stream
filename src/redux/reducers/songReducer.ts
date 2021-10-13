import { Song, Action } from '../../types';
import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
  SET_SONG_LOADING,
} from '../constants/songConstants';
interface InitialState {
  isPlaying: boolean;
  currentSong: Song | null;
  isRelatedSongsLoading: boolean;
  seekPosition: 0;
  isSongLoading: boolean;
}
const initialState: InitialState = {
  isPlaying: false,
  currentSong: null,
  isRelatedSongsLoading: false,
  seekPosition: 0,
  isSongLoading: false,
};

const songReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SONG_LOADING: {
      return { ...state, isSongLoading: payload };
    }
    case SET_CURRENT_SONG:
      return { ...state, currentSong: payload, isSongLoading: false };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
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
