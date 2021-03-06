import React, { useEffect } from 'react';
import { View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import MusicControl, { Command } from 'react-native-music-control';
import BackgroundTimer from 'react-native-background-timer';
import { useAppSelector } from '../hooks/customReduxHooks';
import { setIsPlaying, setSeekPosition } from '../redux/actions/songActions';
import { Song } from '../types';
import useHandlePause from '../hooks/useHandlePause';
import { playNextSong, playPreviousSong } from '../redux/actions/queueActions';

const SongPlayer = () => {
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const { handlePause } = useHandlePause();
  const dispatch = useDispatch();

  useEffect(() => {
    let songPositionPoller: NodeJS.Timeout | null = null;
    if (currentSong?.url) {
      SoundPlayer.loadUrl(currentSong.url);
      MusicControl.setNowPlaying({
        title: currentSong.name,
        artwork: currentSong.thumbnails[0].url,
        artist: currentSong.artist.name,
        album: currentSong.album?.name,
        duration: currentSong.duration / 1000,
        color: 0xffffff,
        colorized: true,
      });
      MusicControl.updatePlayback({
        state: MusicControl.STATE_BUFFERING,
        elapsedTime: 0,
      });

      if (!songPositionPoller) {
        let isInfoCbReceivedMutex = true;
        songPositionPoller = BackgroundTimer.setInterval(() => {
          if (!isInfoCbReceivedMutex) {
            return;
          }
          isInfoCbReceivedMutex = false; // set mutex to false on entry
          SoundPlayer.getInfo().then(info => {
            isInfoCbReceivedMutex = true;
            const { currentTime, duration } = info;
            dispatch(setSeekPosition(info.currentTime));
            if (currentTime && duration - currentTime <= 2) {
              dispatch(playNextSong());
            }
            isInfoCbReceivedMutex = true; // unlock mutex
          });
        }, 1000);
      }
    }
    if (!currentSong?.url && songPositionPoller) {
      BackgroundTimer.clearInterval(songPositionPoller);
    }
    return () => {
      songPositionPoller && BackgroundTimer.clearInterval(songPositionPoller);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong?.url, dispatch]);

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('changePlaybackPosition', true);
    MusicControl.enableControl('seek', true);

    const _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      () => {
        SoundPlayer.play();
        dispatch(setIsPlaying(true));
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
          elapsedTime: 0,
        });
      },
    );
    return () => {
      SoundPlayer.stop();
      _onFinishedLoadingSubscription.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    MusicControl.on(Command.play, handlePause);
    MusicControl.on(Command.pause, handlePause);
    MusicControl.on(Command.seek, SoundPlayer.seek);

    MusicControl.on(Command.nextTrack, () => dispatch(playNextSong()));
    MusicControl.on(Command.previousTrack, () => dispatch(playPreviousSong()));
  }, [dispatch, handlePause]);

  return <View />;
};

export default SongPlayer;
