import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import queueReducer from './queueReducer';
import settingsReducer from './settingsReducer';
import songReducer from './songReducer';

const rootReducer = combineReducers({
  songReducer,
  queueReducer,
  playlistReducer,
  settingsReducer,
});

export default rootReducer;
