import { Song, Playlist, FullSong } from '../../types';
import {
  ADD_NEW_PLAYLIST,
  ADD_SONG_TO_DOWNLOADS,
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_SONG_FROM_DOWNLOADS,
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

export const addSongToDownloads = (songObj: FullSong) => {
  return {
    type: ADD_SONG_TO_DOWNLOADS,
    payload: songObj,
  };
};

export const removeSongFromDownloads = (songId: string) => {
  return {
    type: REMOVE_SONG_FROM_DOWNLOADS,
    payload: songId,
  };
};
