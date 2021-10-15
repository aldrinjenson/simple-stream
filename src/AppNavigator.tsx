import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NowPlaying from './pages/NowPlaying';
import SettingsPage from './pages/SettingsPage';
import DonatePage from './pages/DonatePage';
import AppHeader from './headers/AppHeader';
import BottomBar from './components/Bottombar';
import SearchPage from './pages/SearchPage';
import SongQueue from './pages/SongQueue';
import PlaylistsListPage from './pages/PlaylistsListPage';
import PlaylistSongsPage from './pages/PlaylistSongsPage';
import {
  NOW_PLAYING_SCREEN,
  PLAYLISTS_SCREEN,
  PLAYLIST_SONGS_SCREEN,
  SEARCH_SCREEN,
  SONG_QUEUE_SCREEN,
} from './constants';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => (
  <View style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen
        name={PLAYLISTS_SCREEN}
        component={PlaylistsListPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="library-music"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SEARCH_SCREEN}
        component={SearchPage}
        options={{
          title: 'Search songs',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="search"
              size={23}
            />
          ),
        }}
      />
    </Tab.Navigator>
    <BottomBar />
  </View>
);

function RootDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen name="Donate" component={DonatePage} />
    </Drawer.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={RootDrawer}
        options={{ header: () => <AppHeader /> }}
      />
      <Stack.Screen
        name={NOW_PLAYING_SCREEN}
        component={NowPlaying}
        options={{ headerShown: true, headerTitle: 'Simple Stream' }}
      />
      <Stack.Screen
        name={SONG_QUEUE_SCREEN}
        component={SongQueue}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={PLAYLIST_SONGS_SCREEN}
        component={PlaylistSongsPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
