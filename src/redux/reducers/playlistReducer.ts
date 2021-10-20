/* eslint-disable curly */
import { Action, DownloadPath, Playlist } from '../../types';
import {
  ADD_NEW_PLAYLIST,
  ADD_SONG_TO_DOWNLOADS,
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  DOWNLOAD_ID,
  FAVOURITE_ID,
  REMOVE_SONG_FROM_DOWNLOADS,
  SET_SONG_DOWNLADING,
  UPDATE_PLAYLIST,
} from '../constants/playlistConstants';
import { TOGGLE_SONG_FAVOURITE } from '../constants/songConstants';
import { addNewSongInPlaylist, toggleSongFavouriteInList } from '../reduxUtils';

interface InitialState {
  playlists: Playlist[];
  downloadPaths: DownloadPath;
  downloadingSongs: string[];
}

const initialState: InitialState = {
  playlists: [
    {
      title: 'Downloaded',
      canBeDeleted: false,
      createdAt: new Date(1633594323826).getTime(),
      songs: [],
      id: DOWNLOAD_ID,
    },
    {
      title: 'Favourites',
      canBeDeleted: false,
      createdAt: new Date().getTime(),
      songs: [],
      id: FAVOURITE_ID,
    },
  ],
  downloadPaths: {},
  downloadingSongs: [],
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

    case SET_SONG_DOWNLADING:
      return {
        ...state,
        downloadingSongs: payload ? [...state.downloadingSongs, payload] : [],
      };

    case ADD_SONG_TO_DOWNLOADS:
      const videoId = payload.videoId;
      return {
        ...state,
        downloadPaths: { ...state.downloadPaths, [videoId]: payload },
        downloadingSongs: state.downloadingSongs.filter(vId => vId !== videoId),
      };

    case REMOVE_SONG_FROM_DOWNLOADS:
      const updatededDownloads = { ...state.downloadPaths };
      delete updatededDownloads[payload];
      return {
        ...state,
        downloadPaths: updatededDownloads,
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
