import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {}

const LoadingScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
