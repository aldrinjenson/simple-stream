import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { songData } from './data';

const TRACK_PLAYER_CONTROLS_OPTS = {
  waitforBuffer: true,
  stopWithApp: false,
  alwaysPauseOnInterruption: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
};

const start = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songData);

    await TrackPlayer.play();
    await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);
  } catch (error) {
    console.log('error in setting up player' + error);
  }
};

const SongPlayer = () => {
  useEffect(() => {
    start();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default SongPlayer;
