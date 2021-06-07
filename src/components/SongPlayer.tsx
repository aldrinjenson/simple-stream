import React, { useEffect } from 'react';
import { View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxHooks';
import { setIsPlaying } from '../redux/actions/songActions';

const SongPlayer = () => {
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const songFinishedPlayingListener = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        console.log('finsihed playing song');
        dispatch(setIsPlaying(false));
      },
    );
    const songFinishedLoadingListener = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      () => {
        SoundPlayer.play();
        dispatch(setIsPlaying(true));
      },
    );
    return () => {
      songFinishedPlayingListener.remove();
      songFinishedLoadingListener.remove();
      SoundPlayer.stop();
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentSong?.url) {
      SoundPlayer.loadUrl(currentSong.url);
    }
  }, [currentSong]);

  return <View />;
};

export default SongPlayer;
