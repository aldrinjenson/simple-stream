/* eslint-disable curly */
import { Playlist, Song } from '../types';

export const toggleSongFavouriteInList = (
  song: Song,
  favourites: Playlist,
): Playlist => {
  const songsList = favourites.songs;
  let isFavourite: boolean = false;
  let updatedSongsList = [];
  for (const s of songsList) {
    if (s.videoId === song.videoId) isFavourite = true;
    else updatedSongsList.push(s);
  }
  if (!isFavourite) {
    updatedSongsList.push(song);
  }
  return { ...favourites, songs: updatedSongsList };
};
