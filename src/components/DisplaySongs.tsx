import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../redux/actions/songActions';
import { Song } from '../types';
import SongItem from './SongItem';

interface Props {
  songs: Song[];
  fromQueue?: boolean;
}

const DisplaySongs = (props: Props) => {
  const currentSong = useSelector(state => state.songReducer.currentSong);
  const { songs, fromQueue } = props;
  const dispatch = useDispatch();

  const handleClick = (item: Song) => {
    dispatch(playSong(item));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SongItem
            item={item}
            handleClick={handleClick}
            shouldHighLight={currentSong?.id === item.id}
            fromQueue={fromQueue}
          />
        )}
      />
    </View>
  );
};

export default DisplaySongs;
