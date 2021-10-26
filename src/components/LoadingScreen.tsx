import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { useAppSelector } from '../hooks/customReduxHooks';

const LoadingScreen = () => {
  const theme = useAppSelector(state => state.settingsReducer.theme);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
