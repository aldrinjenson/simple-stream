import React, { useEffect } from 'react';
import { View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import MusicControl, { Command } from 'react-native-music-control';
import { useAppSelector } from '../hooks/customReduxHooks';
import useSongPlayActions from '../hooks/useSongPlayActions';
import { setIsPlaying, setSeekPosition } from '../redux/actions/songActions';
import { Song } from '../types';
import useHandlePause from '../hooks/useHandlePause';

const SongPlayer = () => {
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const { handlePause } = useHandlePause();
  const dispatch = useDispatch();
  const { playNextSong, playPreviousSong } = useSongPlayActions();

  useEffect(() => {
    let songPositionPoller: NodeJS.Timeout | null = null;
    if (currentSong?.url) {
      SoundPlayer.loadUrl(currentSong.url);
      MusicControl.setNowPlaying({
        title: currentSong.name,
        artwork: currentSong.thumbnails[1].url,
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
          state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
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

    MusicControl.on(Command.nextTrack, playNextSong);
    MusicControl.on(Command.previousTrack, playPreviousSong);
  }, [handlePause, playNextSong, playPreviousSong]);

  return <View />;
};

export default SongPlayer;
