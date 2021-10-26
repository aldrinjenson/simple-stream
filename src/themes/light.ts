import { DefaultTheme as NavigationDefaultTheme } from 'react-native-paper';
import { DefaultTheme as PaperDefaultTheme } from '@react-navigation/native';

const light = {
  name: 'light',
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    // tertiary: 'grey'
  },
};

export default light;
