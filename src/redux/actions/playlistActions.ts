import { Song, Playlist } from '../../types';
import {
  ADD_NEW_PLAYLIST,
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
} from '../constants/playlistConstants';

export const updatePlaylist = (updatedPlaylist: Playlist) => {
  return {
    type: UPDATE_PLAYLIST,
    payload: updatedPlaylist,
  };
};

export const addSongToPlaylist = (playlistId: number, song: Song) => {
  return {
    type: ADD_TO_PLAYLIST,
    payload: { id: playlistId, song },
  };
};

export const addNewPlaylist = (newPlaylist: Playlist) => {
  return {
    type: ADD_NEW_PLAYLIST,
    payload: newPlaylist,
  };
};

export const deletePlaylist = (playlistId: number) => {
  return {
    type: DELETE_PLAYLIST,
    payload: playlistId,
  };
};
