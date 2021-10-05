import Toast from 'react-native-simple-toast';
import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
  SET_SONG_QUEUE,
} from '../constants';
import { AppThunk, Song } from '../../types';
import { getRestOfSongProps } from '../../global/utils';
import { Action, ActionCreator } from 'redux';

export const playSong = (songItem: Song): AppThunk => {
  return dispatch => {
    Toast.show('Loading song..');
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

export const setSeekPosition: ActionCreator<Action> = (position: number) => {
  return {
    type: SET_SEEK_POSITION,
    payload: position,
  };
};

export const setIsPlaying: ActionCreator<Action> = (isPlaying: boolean) => {
  return {
    type: SET_IS_PLAYING,
    payload: isPlaying,
  };
};

export const setSongQueue: ActionCreator<Action> = (songQueue: Song[]) => {
  return {
    type: SET_SONG_QUEUE,
    payload: songQueue,
  };
};
