import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage';
import NowPlaying from './pages/NowPlaying';
import SettingsPage from './pages/SettingsPage';
import DonatePage from './pages/DonatePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PlaylistsPage from './pages/PlaylistsPage';
import Searchpage from './pages/Searchpage';
import AppHeader from './components/AppHeader';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const TabRoot = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="home"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Searchpage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? '#2f95dc' : '#000'}
              name="search"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistsPage}
        options={
          {
            // tabBarIcon: ({ focused }) => (
            //   <MaterialIcons
            //     color={focused ? '#2f95dc' : '#000'}
            //     name="photo_library"
            //     size={23}
            //   />
            // ),
          }
        }
      />
    </Tab.Navigator>
  );
};

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabRoot}
        options={{ header: () => <AppHeader /> }}
      />
      <Stack.Screen name="NowPlaying" component={NowPlaying} />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Root} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen name="Donate" component={DonatePage} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
