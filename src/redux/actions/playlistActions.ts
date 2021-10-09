import { Playlist } from '../../types';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../constants/playlistConstants';

export const updatePlaylist = (updatedPlaylist: Playlist) => {
  return {
    type: UPDATE_PLAYLIST,
    payload: updatedPlaylist,
  };
};

export const deletePlaylist = (playlistId: number) => {
  return {
    type: DELETE_PLAYLIST,
    payload: playlistId,
  };
};
