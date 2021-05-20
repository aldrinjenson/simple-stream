import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setIsPlaying } from '../redux/actions/songActions';

const TRACK_PLAYER_CONTROLS_OPTS = {
  waitforBuffer: true,
  stopWithApp: false,
  alwaysPauseOnInterruption: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_SEEK_TO,
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
    await TrackPlayer.add([]);
    await TrackPlayer.play();
    await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);
  } catch (error) {
    console.log('error in setting up player' + error);
  }
};

const SongPlayer = () => {
  const startRef = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (startRef.current === 0) {
      start();
    }
    console.log('rendering useEffect');
    let mounted = true;

    (async () => {
      const trackId = await TrackPlayer.getCurrentTrack();
      if (!mounted || !trackId) return;
      const currentTrack = await TrackPlayer.getTrack(trackId);
      dispatch(setCurrentSong(currentTrack));
    })();

    const trackListener = TrackPlayer.addEventListener(
      'playback-track-changed',
      data => {
        if (!mounted) return;
        TrackPlayer.getTrack(data.nextTrack)
          .then(currentTrack => {
            currentTrack && dispatch(setCurrentSong(currentTrack));
          })
          .catch(err => console.log('error' + err));
      },
    );

    const stateListener = TrackPlayer.addEventListener('playback-state', () => {
      TrackPlayer.getState()
        .then(playerState => {
          dispatch(
            dispatch(setIsPlaying(playerState === TrackPlayer.STATE_PLAYING)),
          );
        })
        .catch(err => console.log('error' + err));
    });
    return () => {
      mounted = false;
      trackListener.remove();
      stateListener.remove();
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
