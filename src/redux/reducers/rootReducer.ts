import { combineReducers } from 'redux';
import songReducer from './songReducer';

const rootReducer = combineReducers({ songReducer });

export default rootReducer;
