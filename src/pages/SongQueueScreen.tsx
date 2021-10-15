import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../hooks/customReduxHooks';
import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import { Song } from '../types';
import { playSong } from '../redux/actions/songActions';
import SongListAppbar from '../components/SongListAppbar';

const SongQueue = () => {
  const queueSongs = useAppSelector<Song[]>(
    state => state.queueReducer.songQueue,
  );
  const isRelatedSongsLoading = useAppSelector(
    state => state.songReducer.isRelatedSongsLoading,
  );
  const dispatch = useDispatch();

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
        <>
          <SongListAppbar />
          <DisplaySongs songs={queueSongs} handleClick={handleClick} />
        </>
      )}
    </View>
  );
};

export default SongQueue;

const styles = StyleSheet.create({});
