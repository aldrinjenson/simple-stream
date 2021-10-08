import React from 'react';
import { FlatList, View } from 'react-native';
import { MenuItem, Song } from '../types';
import SongItem from './SongItem';

interface Props {
  songs: Song[];
  handleClick: (item: Song) => void;
  extraMenuItems?: MenuItem[];
}

const DisplaySongs = (props: Props) => {
  const { songs, handleClick, extraMenuItems } = props;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SongItem
            extraMenuItems={extraMenuItems}
            item={item}
            handleClick={handleClick}
          />
        )}
      />
    </View>
  );
};

export default DisplaySongs;
