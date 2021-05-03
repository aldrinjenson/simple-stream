import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { Appbar } from 'react-native-paper';

interface Props {
  // name: string;
}

const AppHeader = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content
          style={{
            position: 'absolute',
            left: '50%',
            transform: [{ translateX: -80 }],
          }}
          title="Simple-Stream"
        />
      </Appbar.Header>
    </View>
  );
};

export default AppHeader;
