import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
