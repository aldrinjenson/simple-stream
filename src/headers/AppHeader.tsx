import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Appbar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

type DrawerParams = {
  Home: {};
  Settings: {};
  Donate: {};
};

type HeaderNavigationProps = DrawerNavigationProp<DrawerParams, 'Home'>;
interface Props {
  // name: string;
}

const AppHeader = () => {
  const navigation = useNavigation<HeaderNavigationProps>();

  const handleSearch = () => {
    navigation.navigate('SearchPage');
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <Appbar.Content style={{}} title="Simple-Stream" />
        <Appbar.Action icon="magnify" onPress={handleSearch} />
      </Appbar.Header>
    </View>
  );
};

export default AppHeader;
