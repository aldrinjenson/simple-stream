import React, { useState, useEffect } from 'react';
import TextTicker from 'react-native-text-ticker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import TrackPlayer from 'react-native-track-player';
import { useSelector } from 'react-redux';

const BottomBar = () => {
  const navigation = useNavigation();
  const currentSong = useSelector(state => state.songReducer.currentSong);
  const isPlaying = useSelector(state => state.songReducer.isPlaying);
  const isUrlLoading = false;

  const handlePause = () => {
    if (isPlaying) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  if (!currentSong?.id) {
    return null;
  }

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          maxWidth: '80%',
        }}
        onPress={() => navigation.navigate('NowPlaying')}>
        <Image
          style={styles.tabImage}
          source={{
            uri: currentSong.artwork,
          }}
        />
        <View style={{ marginLeft: 10, width: '70%' }}>
          <TextTicker
            style={{ fontSize: 18 }}
            duration={13000}
            marqueeDelay={1000}>
            {currentSong.title}
          </TextTicker>
          <Text>{currentSong.artist}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons
          name={isPlaying ? 'pause-circle-filled' : 'play-circle-fill'}
          color={isUrlLoading ? 'grey' : 'green'}
          size={45}
          onPress={handlePause}
        />

        <MaterialIcons
          onPress={() => TrackPlayer.skipToNext()}
          name="skip-next"
          size={45}
          color="white"
        />
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  tabImage: {
    width: 60,
    height: 60,
  },
  bottomBar: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '6%',
  },
});
