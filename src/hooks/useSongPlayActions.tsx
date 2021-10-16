import { useCallback } from 'react';
import SoundPlayer from 'react-native-sound-player';

const useSongPlayActions = () => {
  const handleSeek = useCallback(seconds => {
    SoundPlayer.seek(seconds);
  }, []);

  return { handleSeek };
};

export default useSongPlayActions;
