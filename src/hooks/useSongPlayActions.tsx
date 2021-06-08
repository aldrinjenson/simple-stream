import Snackbar from 'react-native-snackbar';
import { playSong } from '../redux/actions/songActions';
import { Song } from '../types';
import { useAppDispatch, useAppSelector } from './customReduxHooks';

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
    state => state.songReducer.songQueue,
  );
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const dispatch = useAppDispatch();

  const playNextSong = () => {
    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) + 1;
    if (nextSongIndex >= songQueue.length) {
      Snackbar.show({
        text: 'Currently playing song is the last one in the queue',
      });
    } else {
      const newSongObj = songQueue[nextSongIndex];
      dispatch(playSong(newSongObj));
    }
  };

  const playPreviousSong = () => {
    const nextSongIndex = getCurrentSongIndex(currentSong, songQueue) - 1;
    if (nextSongIndex <= 0) {
      Snackbar.show({
        text: 'Currently playing song is the first one in the queue',
      });
    } else {
      const newSongObj = songQueue[nextSongIndex];
      dispatch(playSong(newSongObj));
    }
  };

  return { playNextSong, playPreviousSong };
};

export default useSongPlayActions;
