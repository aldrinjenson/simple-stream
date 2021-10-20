import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Headline, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import DisplaySongs from '../components/DisplaySongs';
import { useAppSelector } from '../hooks/customReduxHooks';
import {
  removeSongFromDownloads,
  updatePlaylist,
} from '../redux/actions/playlistActions';
import { setSongQueue } from '../redux/actions/queueActions';
import { playSong } from '../redux/actions/songActions';
import { DOWNLOAD_ID } from '../redux/constants/playlistConstants';
import { MenuItem, Playlist, Song } from '../types';

const PlaylistSongsPage = ({ route }) => {
  const playlistId: number = route.params.playlistId;
  const allPlaylists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  const playlist: Playlist = allPlaylists.find(pl => pl.id === playlistId);
  const dispatch = useDispatch();
  const { songs, title } = playlist;

  const handleClick = (item: Song) => {
    dispatch(playSong(item));
    dispatch(setSongQueue(playlist.songs));
  };

  const removeFromPlaylist = (item: Song) => {
    const updatedPlaylistSongs: Song[] = playlist.songs.filter(
      song => song.videoId !== item.videoId,
    );
    dispatch(updatePlaylist({ ...playlist, songs: updatedPlaylistSongs }));
    if (playlist.id === DOWNLOAD_ID) {
      dispatch(removeSongFromDownloads(item.videoId));
    }
  };

  const handlePlaylistPlay = () => {
    dispatch(playSong(songs[0]));
    dispatch(setSongQueue(songs));
  };

  const menuItems: MenuItem[] = [
    { text: 'Remove from playlist', func: removeFromPlaylist },
  ];

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Headline>{title}</Headline>
      <Subheading>
        {songs.length} song{songs.length > 1 && 's'}
      </Subheading>
      <Appbar style={{ justifyContent: 'flex-end', marginVertical: 15 }}>
        <Appbar.Action icon="play" onPress={handlePlaylistPlay} />
      </Appbar>
      <DisplaySongs
        extraMenuItems={menuItems}
        songs={songs}
        handleClick={handleClick}
      />
    </View>
  );
};

export default PlaylistSongsPage;

const styles = StyleSheet.create({});
