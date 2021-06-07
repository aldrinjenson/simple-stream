import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useSelector } from 'react-redux';

const SongPlayer = () => {
  const currentSong = useSelector(state => state.songReducer.currentSong);
  const startRef = useRef(0);

  useEffect(() => {
    const songFinishedListener = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        console.log('finsihed playing song');
      },
    );
    return () => {
      songFinishedListener.remove();
    };
  }, []);

  useEffect(() => {
    if (currentSong.url && startRef.current === 0) {
      SoundPlayer.playUrl(currentSong.url);
    }
  }, [currentSong.url]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default SongPlayer;
