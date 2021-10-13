import Toast from 'react-native-simple-toast';
import { Action, ActionCreator } from 'redux';
import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
  SET_SONG_LOADING,
  TOGGLE_SONG_FAVOURITE,
} from '../constants/songConstants';
import { SET_SONG_QUEUE } from '../constants/queueConstants';
import { AppThunk, Song } from '../../types';
import { apiDispatch, getRestOfSongProps } from '../../global/utils';

export const playSong = (songItem: Song): AppThunk => {
  return dispatch => {
    Toast.show('Loading song..');
    dispatch(apiDispatch(SET_SONG_LOADING, true));
    getRestOfSongProps(songItem)
      .then(completeSong => {
        dispatch({
          type: SET_CURRENT_SONG,
          payload: completeSong,
        });
      })
      .catch(err => console.log('error in dispatching complete song' + err))
      .finally(() => apiDispatch(SET_SONG_LOADING, false));
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

export const toggleFavouriteSong: ActionCreator<Action> = (song: Song) => {
  Toast.show('Updating Favourites');
  return {
    type: TOGGLE_SONG_FAVOURITE,
    payload: song,
  };
};
