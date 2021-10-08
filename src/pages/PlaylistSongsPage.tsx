import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import DisplaySongs from '../components/DisplaySongs';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxHooks';
import { updatePlaylist } from '../redux/actions/playlistActions';
import { playSong, setSongQueue } from '../redux/actions/songActions';
import { MenuItem, Playlist, Song } from '../types';

interface Props {}

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

  const addToPlaylist = () => {};
  const removeFromPlaylist = (item: Song) => {
    const updatedPlaylistSongs: Song[] = playlist.songs.filter(
      song => song.videoId !== item.videoId,
    );
    dispatch(updatePlaylist({ ...playlist, songs: updatedPlaylistSongs }));
  };

  const menuItems: MenuItem[] = [
    { text: 'Remove from Playlist', func: removeFromPlaylist },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Headline>{title}</Headline>
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
