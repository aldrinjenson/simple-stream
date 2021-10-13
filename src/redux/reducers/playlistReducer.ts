/* eslint-disable curly */
import { Action, Playlist } from '../../types';
import {
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
} from '../constants/playlistConstants';
import songData from '../../data';
import { TOGGLE_SONG_FAVOURITE } from '../constants/songConstants';
import { toggleSongFavouriteInList } from '../reduxUtils';

interface InitialState {
  playlists: Playlist[];
  favourites: Playlist;
}

const initialState: InitialState = {
  playlists: [
    {
      title: 'Downloaded',
      canBeDeleted: false,
      createdAt: new Date(1633594323826).getTime(),
      songs: songData,
      id: new Date().getTime(),
    },
  ],
  favourites: {
    title: 'Favourites',
    canBeDeleted: false,
    createdAt: new Date().getTime(),
    songs: songData,
    id: new Date(1634114093543).getTime(),
  },
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
    case TOGGLE_SONG_FAVOURITE:
      const udpatedFavourites = toggleSongFavouriteInList(
        payload,
        state.favourites,
      );
      return { ...state, favourites: udpatedFavourites };
    default:
      return state;
  }
};

export default playlistReducer;
