import { useCallback } from 'react';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { playSong, setSongQueue } from '../redux/actions/songActions';
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
  const dispatch = useDispatch();

  const playNextSong = () => {
    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) + 1;
    if (nextSongIndex >= songQueue.length - 1) {
      Toast.show('Currently playing song is the last one in the queue');
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
    Toast.show('Shuffling queue');
    dispatch(setSongQueue(array));
  }, [dispatch, songQueue]);

  const addSongsToPlaylist = useCallback((songs: Song[]) => {
    console.log(songs);
  }, []);

  return { playNextSong, playPreviousSong, shuffleQueue, addSongsToPlaylist };
};

export default useSongPlayActions;
