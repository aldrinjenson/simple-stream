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
        let isInfoCbReceivedMutex = true;
        songPositionPoller = setInterval(() => {
          if (!isInfoCbReceivedMutex) {
            return;
          }
          isInfoCbReceivedMutex = false; // set mutex false on entry
          SoundPlayer.getInfo().then(info => {
            isInfoCbReceivedMutex = true;
            const { currentTime, duration } = info;
            dispatch(setSeekPosition(info.currentTime));
            if (currentTime && duration - currentTime <= 1) {
              playNextSong();
            }
            isInfoCbReceivedMutex = true; // unlock mutex
          });
        }, 1000);
      }
    }
    return () => {
      songPositionPoller && clearInterval(songPositionPoller);
    };
  }, [currentSong, dispatch]);

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
