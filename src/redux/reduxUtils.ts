/* eslint-disable curly */
import { Playlist, Song } from '../types';
import { FAVOURITE_ID } from './constants/playlistConstants';

export const toggleSongFavouriteInList = (
  song: Song,
  playlists: Playlist[],
): Playlist[] => {
  const favourites = playlists.find(playlist => playlist.id === FAVOURITE_ID);
  const songsList = favourites?.songs || [];
  let isFavourite: boolean = false;
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
