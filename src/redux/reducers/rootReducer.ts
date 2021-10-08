import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import queueReducer from './queueReducer';
import songReducer from './songReducer';

const rootReducer = combineReducers({
  songReducer,
  queueReducer,
  playlistReducer,
});

export default rootReducer;
