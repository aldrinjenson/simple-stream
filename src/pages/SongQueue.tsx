import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxHooks';
import { Song } from '../types';
import { playSong } from '../redux/actions/songActions';

const SongQueue = () => {
  const queueSongs = useAppSelector<Song[]>(
    state => state.songReducer.songQueue,
  );
  const isRelatedSongsLoading = useAppSelector(
    state => state.songReducer.isRelatedSongsLoading,
  );
  const dispatch = useAppDispatch();

  const handleClick = (item: Song) => {
    const index = queueSongs.indexOf(item);
    dispatch(playSong(queueSongs[index]));
  };

  return (
    <View style={{ ...globalStyles.pageContainer }}>
      <Text style={globalStyles.pageTitle}> Queue</Text>
      {isRelatedSongsLoading ? (
        <ActivityIndicator animating={true} color="blue" size="large" />
      ) : (
        <DisplaySongs
          songs={queueSongs}
          fromQueue={true}
          handleClick={handleClick}
        />
      )}
    </View>
  );
};

export default SongQueue;

const styles = StyleSheet.create({});
