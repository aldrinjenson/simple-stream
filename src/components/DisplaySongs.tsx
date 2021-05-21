import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { playSong } from '../global/utils';
import SongItem from './SongItem';

export type Lyric = string[] | { seconds: number; lyrics: string }[];

export interface Song {
  id: string;
  title: string;
  artwork?: string;
  artist: string;
  album?: string;
  duration: number;
  lyrics?: Lyric;
  timeStamped?: boolean;
  isFavourite?: boolean;
  [x: string]: any;
}

interface Props {
  songs: Song[];
  fromQueue?: boolean;
}

const DisplaySongs = (props: Props) => {
  const currentSong = useSelector(state => state.songReducer.currentSong);
  const { songs, fromQueue } = props;

  const handleClick = (item: Song) => {
    playSong(item, false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <SongItem
              item={item}
              handleClick={handleClick}
              shouldHighLight={currentSong.id === item.id}
              fromQueue={fromQueue}
            />
          );
        }}
      />
    </View>
  );
};

export default DisplaySongs;
