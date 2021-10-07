import { useCallback } from 'react';
import MusicControl from 'react-native-music-control';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import { setIsPlaying } from '../redux/actions/songActions';

const useHandlePause = () => {
  const isPlaying = useAppSelector(state => state.songReducer.isPlaying);
  const dispatch = useDispatch();

  const handlePause = useCallback(async () => {
    const { currentTime } = await SoundPlayer.getInfo();
    if (isPlaying) {
      SoundPlayer.pause();
      dispatch(setIsPlaying(false));
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: currentTime,
      });
    } else {
      SoundPlayer.resume();
      dispatch(setIsPlaying(true));
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: currentTime,
      });
    }
  }, [dispatch, isPlaying]);

  const handleSeek = useCallback(seconds => {
    SoundPlayer.seek(seconds);
  }, []);

  return { handlePause, handleSeek };
};

export default useHandlePause;
