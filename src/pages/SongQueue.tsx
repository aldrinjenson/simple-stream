import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { globalStyles } from '../global/globalStyles';
import DisplaySongs, { Song } from '../components/DisplaySongs';

interface Props {}

const SongQueue = (props: Props) => {
  const [songs, setSongs] = useState<Song[]>([]);
  useEffect(() => {
    TrackPlayer.getQueue().then(queue => setSongs(queue));
  }, []);

  return (
    <View style={{ ...globalStyles.pageContainer }}>
      <Text style={globalStyles.pageTitle}> Queue</Text>
      <DisplaySongs songs={songs} />
    </View>
  );
};

export default SongQueue;

const styles = StyleSheet.create({});
