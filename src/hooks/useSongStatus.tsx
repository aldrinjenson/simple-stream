import { useState, useEffect, useMemo } from 'react';
import { FAVOURITE_ID } from '../redux/constants/playlistConstants';
import { Song, Playlist, DownloadPath } from '../types';
import { useAppSelector } from './customReduxHooks';

const useSongStatus = (songItem: Song) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInQueue, setIsInQueue] = useState(false);

  const allPlaylists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  const downloadPaths = useAppSelector<DownloadPath>(
    state => state.playlistReducer.downloadPaths,
  );
  const downloadingSongs = useAppSelector<string[]>(
    state => state.playlistReducer.downloadingSongs,
  );
  const songQueue = useAppSelector<Song[]>(
    state => state.queueReducer.songQueue,
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

  useEffect(() => {
    if (downloadPaths[songItem.videoId]) {
      setIsDownloaded(true);
    } else {
      setIsDownloaded(false);
    }
  }, [songItem, downloadPaths]);

  useEffect(() => {
    setIsDownloading(downloadingSongs.includes(songItem.videoId));
  }, [downloadingSongs, songItem]);

  const queueSongIds = useMemo(() => songQueue.map(s => s.videoId), [
    songQueue,
  ]);

  useEffect(() => {
    setIsInQueue(queueSongIds.includes(songItem.videoId));
  }, [queueSongIds, songItem]);

  return { isFavourite, isDownloaded, isDownloading, isInQueue };
};

export default useSongStatus;
