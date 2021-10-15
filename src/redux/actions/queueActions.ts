import { ActionCreator } from 'redux';
import { Action } from '../../types';
import { SET_SONG_QUEUE } from '../constants/queueConstants';

export const setSongQueue: ActionCreator<Action> = (songQueue: Song[]) => {
  return {
    type: SET_SONG_QUEUE,
    payload: songQueue,
  };
};
