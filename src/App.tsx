import * as React from 'react';
import { Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import SongPlayer from './components/SongPlayer';
import 'intl';
import 'intl/locale-data/jsonp/en';
import rootReducer from './redux/reducers/rootReducer';
import LoadingScreen from './components/LoadingScreen';
import Main from './Main';

LogBox.ignoreLogs([
  'react-native-ytdl is out of date!',
  'ReactNativeFiberHostComponent: Calling getNode()',
  'Require cycle: node_modules/rn-fetch-blob/index.js -> node_modules/rn-fetch-blob',
]);

if (Platform.OS === 'android') {
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['playlistReducer', 'settingsReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <Main />
        <SongPlayer />
      </PersistGate>
    </Provider>
  );
}
