import { Playlist } from '../../types';
import { UPDATE_PLAYLIST } from '../constants/playlistConstants';

export const updatePlaylist = (updatedPlaylist: Playlist) => {
  return {
    type: UPDATE_PLAYLIST,
    payload: updatedPlaylist,
  };
};
