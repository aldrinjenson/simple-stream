import { Song } from '../../types';
import {
  SONG_QUEUE_LOADING_START,
  SET_SONG_QUEUE,
} from '../constants/queueConstants';

interface InitialState {
  songQueue: Song[];
  isRelatedSongsLoading: boolean;
}

const initialState: InitialState = {
  songQueue: [],
  isRelatedSongsLoading: false,
};

type Action = {
  type: string;
  payload: any;
};

const queueReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case SONG_QUEUE_LOADING_START:
      return {
        ...state,
        isRelatedSongsLoading: true,
        songQueue: [],
      };
    case SET_SONG_QUEUE:
      return {
        ...state,
        songQueue: [...payload], // to skip shallow comparison for allow re-renders
        isRelatedSongsLoading: false,
      };
    default:
      return state;
  }
};

export default queueReducer;
