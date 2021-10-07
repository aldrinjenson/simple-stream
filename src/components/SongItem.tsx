import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { globalStyles } from '../global/globalStyles';
import { formatSeconds } from '../global/utils';
import { Song } from '../types';
import { useAppSelector } from '../hooks/customReduxHooks';
import { setSongQueue } from '../redux/actions/songActions';

interface Props {
  item: Song;
  handleClick: (item: Song) => void;
}

const SongItem = (props: Props) => {
  const songQueue = useAppSelector(state => state.queueReducer.songQueue);
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const { item, handleClick } = props;
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isInQueue = songQueue.includes(item);
  const isCurrentSong = currentSong?.videoId === item.videoId;

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

  return (
    <View
      style={{
        ...styles.horizonatalCard,
        backgroundColor: isCurrentSong ? 'grey' : 'transparent',
      }}>
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
          <Menu.Item
            onPress={() => handleAddorRemoveToQueue()}
            title={`${isInQueue ? 'Remove from' : 'Add to'} queue`}
          />
          {!isCurrentSong && (
            <Menu.Item onPress={makeSongPlayNext} title="Play next" />
          )}
          <Menu.Item onPress={() => {}} title="Download" />
        </Menu>
        <MaterialCommunityIcons
          name={item.isFavourite ? 'heart' : 'heart-outline'}
          size={20}
          color={'green'}
          style={{ paddingHorizontal: 5, paddingTop: 7 }}
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
