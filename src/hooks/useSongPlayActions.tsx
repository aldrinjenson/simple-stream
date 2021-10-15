import { useCallback } from 'react';
import Toast from 'react-native-simple-toast';
import SoundPlayer from 'react-native-sound-player';
import { useDispatch } from 'react-redux';
import { setSongQueue } from '../redux/actions/queueActions';
import { playSong } from '../redux/actions/songActions';
import { SET_CURRENT_SONG } from '../redux/constants/songConstants';
import { Song } from '../types';
import { useAppSelector } from './customReduxHooks';

const getCurrentSongIndex = (song: Song, songList: Song[]) => {
  for (let i: number = 0; i < songList.length; i++) {
    if (songList[i].videoId === song.videoId) {
      return i;
    }
  }
  return -1;
};

const useSongPlayActions = () => {
  const songQueue = useAppSelector<Song[]>(
    state => state.queueReducer.songQueue,
  );
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const isSongLoading = useAppSelector<Song>(
    state => state.songReducer.isSongLoading,
  );
  const dispatch = useDispatch();

  const playNextSong = () => {
    if (isSongLoading) {
      return;
    }
    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) + 1;
    if (nextSongIndex >= songQueue.length) {
      Toast.show('Currently playing song is the last one in the queue');
      dispatch({
        type: SET_CURRENT_SONG,
        payload: {},
      });
    } else {
      const newSongObj: Song = songQueue[nextSongIndex];
      dispatch(playSong(newSongObj));
    }
  };

  const playPreviousSong = useCallback(() => {
    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) - 1;
    if (nextSongIndex < 0) {
      Toast.show('Current song is the first one in the queue');
    } else {
      const newSongObj = songQueue[nextSongIndex];
      dispatch(playSong(newSongObj));
    }
  }, [currentSong, dispatch, songQueue]);

  const shuffleQueue = useCallback(() => {
    Toast.show('Shuffling queue');

    let array = songQueue;
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    dispatch(setSongQueue(array));
  }, [dispatch, songQueue]);

  const handleSeek = useCallback(seconds => {
    SoundPlayer.seek(seconds);
  }, []);

  return { playNextSong, playPreviousSong, shuffleQueue, handleSeek };
};

export default useSongPlayActions;
