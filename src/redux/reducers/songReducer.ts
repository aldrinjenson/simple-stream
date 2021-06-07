import { Song } from '../../types';
import { SET_CURRENT_SONG, SET_IS_PLAYING } from '../constants';
interface InitialState {
  isPlaying: boolean;
  currentSong: Song | null;
  currentSongStatus: any;
}
const initialState: InitialState = {
  isPlaying: false,
  currentSong: null,
  currentSongStatus: {},
};

const songReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_SONG:
      return { ...state, currentSong: payload };

    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
      };
    default:
      return state;
  }
};

export default songReducer;
