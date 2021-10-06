import { useCallback } from 'react';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import { setIsPlaying } from '../redux/actions/songActions';

const useHandlePause = () => {
  const isPlaying = useAppSelector(state => state.songReducer.isPlaying);
  const dispatch = useDispatch();

  const handlePause = useCallback(() => {
    if (isPlaying) {
      SoundPlayer.pause();
      dispatch(setIsPlaying(false));
    } else {
      SoundPlayer.resume();
      dispatch(setIsPlaying(true));
    }
  }, [dispatch, isPlaying]);

  const handleSeek = useCallback(seconds => {
    SoundPlayer.seek(seconds);
  }, []);

  return { handlePause, handleSeek };
};

export default useHandlePause;
