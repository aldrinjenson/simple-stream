/* eslint-disable curly */
import { Action, Playlist } from '../../types';
import {
  ADD_NEW_PLAYLIST,
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  FAVOURITE_ID,
  UPDATE_PLAYLIST,
} from '../constants/playlistConstants';
import songData from '../../data';
import { TOGGLE_SONG_FAVOURITE } from '../constants/songConstants';
import { addNewSongInPlaylist, toggleSongFavouriteInList } from '../reduxUtils';

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
      id: new Date().getTime(),
    },
    {
      title: 'Favourites',
      canBeDeleted: false,
      createdAt: new Date().getTime(),
      songs: songData,
      id: FAVOURITE_ID,
    },
  ],
};

const playlistReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        playlists: addNewSongInPlaylist(
          state.playlists,
          payload.id,
          payload.song,
        ),
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
      return {
        ...state,
        playlists: toggleSongFavouriteInList(payload, state.playlists),
      };
    case ADD_NEW_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, payload],
      };
    default:
      return state;
  }
};

export default playlistReducer;