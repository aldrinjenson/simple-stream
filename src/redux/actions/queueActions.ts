import { ActionCreator } from 'redux';
import Toast from 'react-native-simple-toast';

import { getCurrentSongIndex } from '../../global/songUtils';
import { Action, Song } from '../../types';
import { SET_SONG_QUEUE } from '../constants/queueConstants';
import { SET_CURRENT_SONG } from '../constants/songConstants';
import { playSong } from './songActions';
import { AppDispatch, RootState } from '../../App';

export const setSongQueue: ActionCreator<Action> = (songQueue: Song[]) => {
  return {
    type: SET_SONG_QUEUE,
    payload: songQueue,
  };
};

export const playNextSong = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const songQueue = getState().queueReducer.songQueue;
    const currentSong = getState().songReducer.currentSong;
    const isSongLoading = getState().songReducer.isSongLoading;

    if (isSongLoading) {
      return;
    }
    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) + 1;
    if (nextSongIndex >= songQueue.length) {
      Toast.show('Currently playing song is the last one in the queue');
      dispatch({
        type: SET_CURRENT_SONG,
        payload: {},
      });
      dispatch(setSongQueue([]))
    } else {
      const newSongObj: Song = songQueue[nextSongIndex];
      dispatch(playSong(newSongObj));
    }
  };
};

export const playPreviousSong = () => {
  return (dispatch, getState) => {
    const songQueue = getState().queueReducer.songQueue;
    const currentSong = getState().songReducer.currentSong;

    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) - 1;
    if (nextSongIndex < 0) {
      Toast.show('Current song is the first one in the queue');
    } else {
      const newSongObj = songQueue[nextSongIndex];
      dispatch(playSong(newSongObj));
    }
  };
};

export const shuffleQueue = () => {
  return (dispatch, getState) => {
    const songQueue = getState().queueReducer.songQueue;
    Toast.show('Shuffling queue');
    let array = songQueue;
    let currentIndex = array.length
    let randomIndex;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    dispatch(setSongQueue(array));
  };
};
