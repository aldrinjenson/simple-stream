import { useState, useEffect } from 'react';
import { FAVOURITE_ID } from '../redux/constants/playlistConstants';
import { Song, Playlist } from '../types';
import { useAppSelector } from './customReduxHooks';

const useIsFavourite = (songItem: Song) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const allPlaylists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  useEffect(() => {
    const favourites = allPlaylists.find(
      (playlist: Playlist) => playlist.id === FAVOURITE_ID,
    );
    const favouriteSongs = favourites?.songs || [];
    for (let i = 0; i < favouriteSongs.length; i++) {
      if (favouriteSongs[i].videoId === songItem.videoId) {
        setIsFavourite(true);
        return;
      }
    }
    setIsFavourite(false);
  }, [allPlaylists, songItem]);
  return { isFavourite };
};

export default useIsFavourite;
