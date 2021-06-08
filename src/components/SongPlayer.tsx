import React, { useEffect } from 'react';
import { View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxHooks';
import useSongPlayActions from '../hooks/useSongPlayActions';
import { setIsPlaying } from '../redux/actions/songActions';

const SongPlayer = () => {
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const dispatch = useAppDispatch();
  const { playNextSong } = useSongPlayActions();

  useEffect(() => {
    const songFinishedPlayingListener = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        console.log('finished playing song');
        dispatch(setIsPlaying(false));
        playNextSong();
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
