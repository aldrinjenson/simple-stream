import { Action, Playlist } from '../../types';
import { ADD_TO_PLAYLIST } from '../constants/playlistConstants';
import songData from '../../data';

interface InitialState {
  playlists: Playlist[];
}

const initialState: InitialState = {
  playlists: [
    {
      title: 'Downloaded',
      canBeDeleted: false,
      createdAt: new Date(1633594323826).getTime(),
      songs: songData,
      id: new Date().getSeconds(),
    },
    {
      title: 'Favourites',
      canBeDeleted: false,
      createdAt: new Date().getTime(),
      songs: songData,
      id: new Date(1633594323826).getSeconds(),
    },
  ],
};

const playlistReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_PLAYLIST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default playlistReducer;
