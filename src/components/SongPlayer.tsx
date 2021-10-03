import React, { useEffect } from 'react';
import { View } from 'react-native';
import SoundPlayer, { SoundPlayerEventData } from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import useSongPlayActions from '../hooks/useSongPlayActions';
import { setIsPlaying } from '../redux/actions/songActions';

const SongPlayer = () => {
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const dispatch = useDispatch();
  const { playNextSong } = useSongPlayActions();

  const isPlaying = useAppSelector<boolean>(
    state => state.songReducer.isPlaying,
  );

  useEffect(() => {
    if (currentSong?.url) {
      SoundPlayer.loadUrl(currentSong.url);
    }
  }, [currentSong]);

  useEffect(() => {
    console.log('rendering useEffect');
    const _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        console.log('finished playing song');
        if (isPlaying) {
          console.log('inside if');
          dispatch(setIsPlaying(false));
          playNextSong();
        }
      },
    );
    const _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      () => {
        if (!isPlaying) {
          console.log('finished loading url');
          SoundPlayer.play();
          dispatch(setIsPlaying(true));
        }
      },
    );
    return () => {
      console.log('in useefect return');
      _onFinishedPlayingSubscription.remove();
      _onFinishedLoadingSubscription.remove();
    };
  }, []);

  return <View />;
};

export default SongPlayer;
