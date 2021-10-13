import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { globalStyles } from '../global/globalStyles';
import { formatSeconds } from '../global/utils';
import { MenuItem, Song } from '../types';
import { useAppSelector } from '../hooks/customReduxHooks';
import {
  setSongQueue,
  toggleFavouriteSong,
} from '../redux/actions/songActions';
import PlaylistModal from './PlaylistModal';
import useIsFavourite from '../hooks/useIsFavourite';

interface Props {
  item: Song;
  handleClick: (item: Song) => void;
  extraMenuItems?: MenuItem[];
}

const SongItem = (props: Props) => {
  const songQueue = useAppSelector(state => state.queueReducer.songQueue);
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const { item, handleClick, extraMenuItems } = props;
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { isFavourite } = useIsFavourite(item);

  const isQueueActive = songQueue.length;
  const isInQueue = songQueue.includes(item);
  const isCurrentSong = currentSong?.videoId === item.videoId;

  // usecallback here
  const handleAddorRemoveToQueue = () => {
    setIsMenuVisible(false);
    let updatedSongQueue;
    if (!isInQueue) {
      updatedSongQueue = [...songQueue, item];
      Toast.show('Adding to queue');
    } else {
      updatedSongQueue = songQueue.filter(
        song => song.videoId !== item.videoId,
      );
      Toast.show('Removing from queue');
    }
    dispatch(setSongQueue(updatedSongQueue));
  };
  // usecallback here
  const makeSongPlayNext = () => {
    let updatedSongQueue = [];
    for (const song of songQueue) {
      if (song.videoId === item.videoId) {
        continue;
      }
      updatedSongQueue.push(song);
      if (song.videoId === currentSong.videoId) {
        updatedSongQueue.push(item);
      }
    }
    setIsMenuVisible(false);
    Toast.show('Updating queue');
    dispatch(setSongQueue(updatedSongQueue));
  };

  const handleAddToPlaylist = () => {
    setIsMenuVisible(false);
    setPlaylistModalVisible(true);
  };

  const handleExtraMenuItem = (func: (item: Song) => void) => () => {
    // chaining functions
    setIsMenuVisible(false);
    func(item);
  };

  return (
    <View
      style={{
        ...styles.horizonatalCard,
        backgroundColor: isCurrentSong ? 'grey' : 'transparent',
      }}>
      <PlaylistModal
        visible={playlistModalVisible}
        onDismiss={() => setPlaylistModalVisible(false)}
        song={item}
      />
      <MaterialIcons name="reorder" size={15} style={{ paddingRight: 2 }} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          maxWidth: '88%',
        }}
        onPress={() => !isCurrentSong && handleClick(item)}>
        <Image
          style={styles.thumbnail}
          source={{ uri: item.thumbnails[0].url }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...globalStyles.title, flexWrap: 'wrap' }}>
            {item.name}
          </Text>
          <Text>{item.artist.name}</Text>
          <Text>{formatSeconds(item.duration, true)}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          padding: 5,
          paddingBottom: 10,
        }}>
        <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          anchor={
            <MaterialIcons
              onPress={() => setIsMenuVisible(true)}
              name="more-vert"
              size={30}
            />
          }>
          {isQueueActive ? (
            <Menu.Item
              onPress={() => handleAddorRemoveToQueue()}
              title={`${isInQueue ? 'Remove from' : 'Add to'} queue`}
            />
          ) : null}
          <Menu.Item
            onPress={() => handleAddToPlaylist()}
            title="Add to playlist"
          />
          {!isCurrentSong && isQueueActive ? (
            <Menu.Item onPress={makeSongPlayNext} title="Play next" />
          ) : null}
          <Menu.Item onPress={() => {}} title="Download" />
          {extraMenuItems?.map(({ text, func }) => (
            <Menu.Item
              key={text}
              onPress={handleExtraMenuItem(func)}
              title={text}
            />
          ))}
        </Menu>
        <MaterialCommunityIcons
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={20}
          color={'green'}
          style={{ paddingHorizontal: 5, paddingTop: 7 }}
          onPress={() => dispatch(toggleFavouriteSong(item))}
        />
      </View>
    </View>
  );
};

export default SongItem;

const styles = StyleSheet.create({
  horizonatalCard: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#aaa',
    alignItems: 'center',
    padding: 3,
    marginBottom: 10,
  },
  thumbnail: {
    height: 75,
    width: 75,
  },
});
