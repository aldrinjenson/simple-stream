import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import { LogBox } from 'react-native';
import thunk from 'redux-thunk';
import SongPlayer from './components/SongPlayer';
import 'intl';
import 'intl/locale-data/jsonp/en';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';

LogBox.ignoreLogs(['react-native-ytdl is out of date!']);

if (Platform.OS === 'android') {
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <SongPlayer />
      </PaperProvider>
    </Provider>
  );
}
