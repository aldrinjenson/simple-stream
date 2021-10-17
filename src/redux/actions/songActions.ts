import { Action, ActionCreator } from 'redux';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_SEEK_POSITION,
  SET_SONG_LOADING,
  TOGGLE_SONG_FAVOURITE,
} from '../constants/songConstants';
import { AppThunk, FullSong, Song } from '../../types';
import { apiDispatch, getRestOfSongProps } from '../../global/utils';
import { downloadHelper } from '../../global/songUtils';
import { addSongToDownloads, addSongToPlaylist } from './playlistActions';
import {
  DOWNLOAD_ID,
  SET_SONG_DOWNLADING,
} from '../constants/playlistConstants';
import { requestFileAccessPermission } from '../../global/misc';

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

export const toggleFavouriteSong: ActionCreator<Action> = (song: Song) => {
  Toast.show('Updating Favourites');
  return {
    type: TOGGLE_SONG_FAVOURITE,
    payload: song,
  };
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
    const { name, thumbnails, url, artist, videoId } = songItem;
    const songName = `${name}-${artist.name || videoId}`.split(' ').join('_');
    const imgPath = `thumbs/${songName}.png`;
    const songPath = `${songName}.mp3`;

    Toast.show(
      'Downloading Song and thumbnail\nProgress can be checked in the status bar',
    );

    const choosenThumbnail = thumbnails[thumbnails.length - 1];
    let savedSongPath: string = await downloadHelper(
      songPath,
      url,
      songName + '.mp3',
    );
    let savedImgPath: string = await downloadHelper(
      imgPath,
      choosenThumbnail.url,
      songName + '.jpg',
    );

    console.log(savedSongPath, savedImgPath);
    const fullSong: FullSong = {
      ...songItem,
      url: savedSongPath,
      thumbnails: [
        {
          ...choosenThumbnail,
          url:
            Platform.OS === 'android' ? 'file://' + savedImgPath : savedImgPath,
        },
      ],
    };

    Toast.show('Song downloaded to: ' + savedSongPath, Toast.LONG);
    dispatch(addSongToDownloads(fullSong));
    dispatch(addSongToPlaylist(DOWNLOAD_ID, song));
  };
};
