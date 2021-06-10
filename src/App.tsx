import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import SongPlayer from './components/SongPlayer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'intl';
import 'intl/locale-data/jsonp/en';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';

if (Platform.OS === 'android') {
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <SongPlayer />
      </Provider>
    </PaperProvider>
  );
}
