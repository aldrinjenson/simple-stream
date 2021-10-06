import React from 'react';
import { FlatList, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxHooks';
import { setSongQueue } from '../redux/actions/songActions';
import { Song } from '../types';
import SongItem from './SongItem';

interface Props {
  songs: Song[];
  handleClick: (item: Song) => void;
}

const DisplaySongs = (props: Props) => {
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const { songs, handleClick } = props;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SongItem item={item} handleClick={handleClick} />
        )}
      />
    </View>
  );
};

export default DisplaySongs;
