import SoundPlayer from 'react-native-sound-player';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxHooks';
import { setIsPlaying } from '../redux/actions/songActions';

const useHandlePause = () => {
  const isPlaying = useAppSelector(state => state.songReducer.isPlaying);
  const dispatch = useAppDispatch();

  const handlePause = () => {
    if (isPlaying) {
      SoundPlayer.pause();
      dispatch(setIsPlaying(false));
    } else {
      SoundPlayer.resume();
      dispatch(setIsPlaying(true));
    }
  };

  return handlePause;
};

export default useHandlePause;
