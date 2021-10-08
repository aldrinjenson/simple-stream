import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DisplaySongs from '../components/DisplaySongs';
import { Playlist, Song } from '../types';

interface Props {}

const PlaylistSongsPage = ({ route }) => {
  const playlist: Playlist = route.params.playlist;
  console.log(playlist);
  const { songs, title } = playlist;

  const handleClick = (item: Song) => {
    console.log(item);
    // dispatch(playSong(item));
    // dispatch(getSuggestedSongsList(item.videoId));
  };
  console.log(songs.length);
  return (
    <View>
      <Text>{title}</Text>
      {/* <DisplaySongs songs={songs} handleClick={handleClick} /> */}
    </View>
  );
};

export default PlaylistSongsPage;

const styles = StyleSheet.create({});
