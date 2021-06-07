import { SET_CURRENT_SONG, SET_IS_PLAYING } from '../constants';
import { Song } from '../../types';
import { getRestOfSongProps } from '../../global/utils';

export const playSong = (songItem: Song) => {
  return (dispatch: (arg0: { type: string; payload: Song }) => void) => {
    getRestOfSongProps(songItem)
      .then(completeSong => {
        dispatch({
          type: SET_CURRENT_SONG,
          payload: completeSong,
        });
      })
      .catch(err => console.log('error in dispatching complete song' + err));
  };
};

export const setIsPlaying = (isPlaying: boolean) => {
  return {
    type: SET_IS_PLAYING,
    payload: isPlaying,
  };
};
