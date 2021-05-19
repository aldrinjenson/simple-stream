import React, { useState, useEffect } from 'react';
import TextTicker from 'react-native-text-ticker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import TrackPlayer from 'react-native-track-player';

const BottomBar = () => {
  const navigation = useNavigation();
  const [isPaused, setIsPaused] = useState(false);
  const isUrlLoading = false;

  useEffect(() => {
    TrackPlayer.getState().then(state =>
      setIsPaused(state === TrackPlayer.STATE_PAUSED),
    );
  }, []);

  const handlePause = () => {
    TrackPlayer.getState().then(state => {
      if (state === TrackPlayer.STATE_PLAYING) {
        TrackPlayer.pause();
        setIsPaused(true);
      } else {
        TrackPlayer.play();
        setIsPaused(false);
      }
    });
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexGrow: 1,
          maxWidth: '80%',
        }}
        onPress={() => navigation.navigate('NowPlaying')}>
        <Image
          style={styles.tabImage}
          source={{
            uri:
              'https://callstack.github.io/react-native-paper/screenshots/chip-1.png',
          }}
        />
        <View style={{ marginLeft: 10, width: '70%' }}>
          <TextTicker
            style={{ fontSize: 18 }}
            duration={13000}
            marqueeDelay={1000}>
            Lorem ipsum dolor sit, amet elit. Ducimus
          </TextTicker>
          <Text>Imagine Dragons</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons
          name={isPaused ? 'play-circle-fill' : 'pause-circle-filled'}
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
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '6%',
  },
});
