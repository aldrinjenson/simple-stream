import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const LibraryPage = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text>Home Page</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('NowPlaying')}>
        Open Now Playing
      </Button>
    </View>
  );
};

export default LibraryPage;

const styles = StyleSheet.create({});
