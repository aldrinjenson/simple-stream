/* eslint-disable curly */
import { Action, Playlist } from '../../types';
import {
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
} from '../constants/playlistConstants';
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
      id: 234,
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
    case UPDATE_PLAYLIST:
      const updatedPlaylists = state.playlists.map(playlist => {
        if (playlist.id === payload.id) return payload;
        else return playlist;
      });
      return {
        ...state,
        playlists: updatedPlaylists,
      };
    case DELETE_PLAYLIST:
      const updatedPlaylistList = state.playlists.filter(
        playlist => playlist.id !== payload,
      );
      return {
        ...state,
        playlists: updatedPlaylistList,
      };
    default:
      return state;
  }
};

export default playlistReducer;
