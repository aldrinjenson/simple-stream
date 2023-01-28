/* eslint-disable curly */
import Toast from 'react-native-simple-toast';
import { Playlist, Song } from '../types';
import { FAVOURITE_ID } from './constants/playlistConstants';

export const toggleSongFavouriteInList = (
  song: Song,
  playlists: Playlist[],
): Playlist[] => {
  const favourites = playlists.find(playlist => playlist.id === FAVOURITE_ID);
  const songsList = favourites?.songs || [];
  let isFavourite = false;
  let updatedSongsList = [];
  for (const s of songsList) {
    if (s.videoId === song.videoId) isFavourite = true;
    else updatedSongsList.push(s);
  }
  if (!isFavourite) {
    updatedSongsList.push(song);
  }
  const updatedFavourites = { ...favourites, songs: updatedSongsList };

  const updatedPlaylits: Playlist[] = playlists.map(pl => {
    if (pl.id === FAVOURITE_ID) return updatedFavourites;
    else return pl;
  });
  return updatedPlaylits;
};

export const addNewSongInPlaylist = (
  playlists: Playlist[],
  playlistId: number,
  song: Song,
): Playlist[] => {
  const updatedPlaylist = playlists.map(pl => {
    if (pl.id === playlistId) {
      if (pl.songs.includes(song)) {
        Toast.show('Song already in playlist');
        return pl;
      }
      return { ...pl, songs: [...pl.songs, song] };
    } else return pl;
  });
  Toast.show('Song added to playlist');
  return updatedPlaylist;
};
