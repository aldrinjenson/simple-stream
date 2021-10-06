import { combineReducers } from 'redux';
import queueReducer from './queueReducer';
import songReducer from './songReducer';

const rootReducer = combineReducers({ songReducer, queueReducer });

export default rootReducer;
