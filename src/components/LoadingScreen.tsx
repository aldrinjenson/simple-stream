import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {}

const LoadingScreen = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
