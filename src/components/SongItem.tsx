import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { globalStyles } from '../global/globalStyles';
import { formatSeconds } from '../global/utils';
import { MenuItem, Song } from '../types';
import { useAppSelector } from '../hooks/customReduxHooks';
import {
  downloadSong,
  playSong,
  toggleFavouriteSong,
} from '../redux/actions/songActions';
import { setSongQueue } from '../redux/actions/queueActions';
import PlaylistModal from './PlaylistModal';
import useSongStatus from '../hooks/useSongStatus';
interface Props {
  item: Song;
  handleClick: (item: Song) => void;
  extraMenuItems?: MenuItem[];
  renderProps?: RenderItemParams<Song>;
  canDrag: boolean;
}

const SongItem = (props: Props) => {
  const songQueue = useAppSelector(state => state.queueReducer.songQueue);
  const currentSong = useAppSelector(state => state.songReducer.currentSong);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { item, handleClick, extraMenuItems, renderProps, canDrag } = props;
  const { isFavourite, isDownloaded, isDownloading } = useSongStatus(item);

  const isQueueActive = useMemo(() => songQueue.length, [songQueue.length]);
  const isInQueue = useMemo(() => songQueue.includes(item), [item, songQueue]);
  const isCurrentSong = currentSong?.videoId === item.videoId;

  const handleAddorRemoveToQueue = () => {
    setIsMenuVisible(false);
    if (!songQueue?.length) {
      dispatch(playSong(item));
      dispatch(setSongQueue([item]));
      return;
    }
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

  const handleAddToPlaylist = () => {
    setIsMenuVisible(false);
    setPlaylistModalVisible(true);
  };

  const handleExtraMenuItem = (func: (item: Song) => void) => () => {
    setIsMenuVisible(false);
    func(item);
  };
  const handleDownload = () => {
    dispatch(downloadSong(item));
    setIsMenuVisible(false);
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
      {canDrag && (
        <MaterialIcons
          name="reorder"
          size={15}
          style={{
            paddingRight: 2,
            paddingVertical: 10,
          }}
          onLongPress={renderProps?.drag}
        />
      )}
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
        <View style={{ marginLeft: 10, maxWidth: '70%' }}>
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
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
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
          {!isDownloaded && !isDownloading && (
            <Menu.Item onPress={handleDownload} title="Download" />
          )}
          {extraMenuItems?.map(({ text, func }) => (
            <Menu.Item
              key={text}
              onPress={handleExtraMenuItem(func)}
              title={text}
            />
          ))}
        </Menu>
        <View style={{ flexDirection: 'row' }}>
          {isDownloading && (
            <Image
              source={require('../assets/downloading.gif')}
              style={{ width: 20, height: 20, alignSelf: 'flex-end' }}
            />
          )}
          {isDownloaded && (
            <MaterialCommunityIcons
              name="download"
              size={20}
              color={'green'}
              style={{ paddingHorizontal: 5, paddingTop: 7 }}
            />
          )}
          <MaterialCommunityIcons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={20}
            color={'green'}
            style={{ paddingHorizontal: 5, paddingTop: 7 }}
            onPress={() => dispatch(toggleFavouriteSong(item))}
          />
        </View>
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
