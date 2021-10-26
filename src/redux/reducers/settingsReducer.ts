import darkTheme from '../../themes/dark';
import light from '../../themes/light';
import { Action } from '../../types';
import { UPDATE_THEME } from '../constants/settingsConstants';

interface InitialState {
  theme: any;
  isTourComplete: boolean;
}

const initialState: InitialState = {
  theme: darkTheme,
  isTourComplete: true,
};

const settingsReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};
export default settingsReducer;
