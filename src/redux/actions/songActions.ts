import { Action, ActionCreator } from 'redux';
import Toast from 'react-native-simple-toast';
import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
  SET_SONG_LOADING,
  TOGGLE_SONG_FAVOURITE,
} from '../constants/songConstants';
import { SET_SONG_QUEUE } from '../constants/queueConstants';
import { AppThunk, FullSong, Song } from '../../types';
import { apiDispatch, getRestOfSongProps } from '../../global/utils';
import { downloadHelper } from '../../global/songUtils';
import { addSongToDownloads, addSongToPlaylist } from './playlistActions';
import {
  DOWNLOAD_ID,
  SET_SONG_DOWNLADING,
} from '../constants/playlistConstants';
import { PermissionsAndroid, Platform } from 'react-native';

export const setCurentSong = (completeSong: FullSong) => {
  return {
    type: SET_CURRENT_SONG,
    payload: completeSong,
  };
};

export const playSong = (songItem: Song): AppThunk => {
  return (dispatch, getState) => {
    Toast.show('Loading song..');
    dispatch(apiDispatch(SET_SONG_LOADING, true));
    const existingSongObj = getState().playlistReducer.downloadPaths[
      songItem.videoId
    ];
    if (existingSongObj) {
      console.log(existingSongObj.url);
      Toast.show('Playing from downloads');
      dispatch(setCurentSong(existingSongObj));
      return;
    }
    getRestOfSongProps(songItem)
      .then(completeSong => dispatch(setCurentSong(completeSong)))
      .catch(err => console.log('error in dispatching complete song' + err))
      .finally(() => apiDispatch(SET_SONG_LOADING, false));
  };
};

const requestFileAccessPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Gran File Access Permission',
        message: 'You need to give File Access permission to download songs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('File access permission received');
    } else {
      console.log('File access permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const downloadSong = (song: Song) => {
  return async (dispatch, getState) => {
    await requestFileAccessPermission();
    const existingSongObj = getState().playlistReducer.downloadPaths[
      song.videoId
    ];
    if (existingSongObj) {
      Toast.show('Already downloaded');
      return;
    }

    let songItem = song;
    if (!songItem.url) {
      Toast.show('Preparing to download song..');
      songItem = await getRestOfSongProps(song);
    }
    dispatch(apiDispatch(SET_SONG_DOWNLADING, song.videoId));
    const songName = `${songItem.name}-${songItem.artist.name || songItem.videoId
      }`
      .split(' ')
      .join('_');
    const imgPath = `thumbs/${songName}.png`;
    const songPath = `${songName}.mp3`;

    Toast.show(
      'Downloading Song and thumbnail\nProgress can be checked in the status bar',
    );

    let savedSongPath: string = await downloadHelper(
      songPath,
      songItem.url,
      songName + '.mp3',
    );
    let savedImgPath: string = await downloadHelper(
      imgPath,
      songItem.thumbnails[2].url,
      songName + '.jpg',
    );

    console.log(savedSongPath, savedImgPath);
    const fullSong: FullSong = {
      ...songItem,
      url: savedSongPath,
      thumbnails: [
        {
          ...songItem.thumbnails[2],
          url:
            Platform.OS === 'android' ? 'file://' + savedImgPath : savedImgPath,
        },
      ],
    };

    Toast.show('Song downloaded to: ' + savedSongPath);
    dispatch(addSongToDownloads(fullSong));
    dispatch(addSongToPlaylist(DOWNLOAD_ID, song));
  };
};

export const setSeekPosition: ActionCreator<Action> = (position: number) => {
  return {
    type: SET_SEEK_POSITION,
    payload: position,
  };
};

export const setIsPlaying: ActionCreator<Action> = (isPlaying: boolean) => {
  return {
    type: SET_IS_PLAYING,
    payload: isPlaying,
  };
};

export const setSongQueue: ActionCreator<Action> = (songQueue: Song[]) => {
  return {
    type: SET_SONG_QUEUE,
    payload: songQueue,
  };
};

export const toggleFavouriteSong: ActionCreator<Action> = (song: Song) => {
  Toast.show('Updating Favourites');
  return {
    type: TOGGLE_SONG_FAVOURITE,
    payload: song,
  };
};
