import React from 'react';
import { FlatList, View } from 'react-native';
import { useAppSelector } from '../hooks/customReduxHooks';
import { Song } from '../types';
import SongItem from './SongItem';

interface Props {
  songs: Song[];
  fromQueue?: boolean;
  handleClick: (item: Song) => void;
}

const DisplaySongs = (props: Props) => {
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const { songs, fromQueue, handleClick } = props;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SongItem
            item={item}
            handleClick={handleClick}
            shouldHighLight={currentSong?.videoId === item.videoId}
            fromQueue={fromQueue}
          />
        )}
      />
    </View>
  );
};

export default DisplaySongs;
