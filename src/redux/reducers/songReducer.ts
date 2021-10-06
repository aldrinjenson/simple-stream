import { Song } from '../../types';
import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
} from '../constants/songConstants';
interface InitialState {
  isPlaying: boolean;
  currentSong: Song | null;
  isRelatedSongsLoading: boolean;
  seekPosition: 0;
}
const initialState: InitialState = {
  isPlaying: false,
  currentSong: null,
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
