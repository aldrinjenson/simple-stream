import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NowPlaying from './pages/NowPlaying';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import DonatePage from './pages/DonatePage';
import AppHeader from './headers/AppHeader';
import Searchpage from './pages/Searchpage';
import SearchHeader from './headers/SearchHeader';
import { View } from 'react-native';
import BottomBar from './components/Bottombar';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => (
  <View style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen
        name="Playlists"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? '#2f95dc' : '#000'}
              name="playlist-music"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Starred"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="star-outline"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Downloaded"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="file-download"
              size={23}
            />
          ),
        }}
      />
    </Tab.Navigator>
    <BottomBar />
  </View>
);
const LibraryTabs = () => (
  <View style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen
        name="Artists"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? '#2f95dc' : '#000'}
              name="account-music"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Albums"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="album"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Songs"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? '#2f95dc' : '#000'}
              name="music"
              size={23}
            />
          ),
        }}
      />
    </Tab.Navigator>
    {/* <BottomBar /> */}
  </View>
);

function RootDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Library" component={LibraryTabs} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen name="Donate" component={DonatePage} />
    </Drawer.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Simple Music"
        component={RootDrawer}
        options={{ header: () => <AppHeader /> }}
      />
      <Stack.Screen name="NowPlaying" component={NowPlaying} />
      <Stack.Screen
        name="SearchPage"
        component={Searchpage}
        options={{
          header: ({ navigation }) => <SearchHeader navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
