import React, { useEffect } from 'react';
import { View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import useSongPlayActions from '../hooks/useSongPlayActions';
import { setIsPlaying, setSeekPosition } from '../redux/actions/songActions';

const SongPlayer = () => {
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const dispatch = useDispatch();
  const { playNextSong } = useSongPlayActions();

  useEffect(() => {
    let songPositionPoller: NodeJS.Timeout | null = null;
    if (currentSong?.url) {
      SoundPlayer.loadUrl(currentSong.url);
      if (!songPositionPoller) {
        songPositionPoller = setInterval(() => {
          SoundPlayer.getInfo().then(info => {
            const { currentTime, duration } = info;
            dispatch(setSeekPosition(info.currentTime));
            if (currentTime && duration - currentTime <= 0.5) {
              playNextSong();
            }
          });
        }, 750);
      }
    }
    return () => {
      songPositionPoller && clearInterval(songPositionPoller);
    };
  }, [currentSong, dispatch, playNextSong]);

  useEffect(() => {
    const _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      () => {
        SoundPlayer.play();
        dispatch(setIsPlaying(true));
      },
    );
    return () => {
      SoundPlayer.stop();
      _onFinishedLoadingSubscription.remove();
    };
  }, [dispatch]);

  return <View />;
};

export default SongPlayer;
