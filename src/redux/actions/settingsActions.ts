import { UPDATE_THEME } from "../constants/settingsConstants";

export const updateTheme = (newTheme) => {
  return {
    type: UPDATE_THEME,
    payload: newTheme,
  };
};
