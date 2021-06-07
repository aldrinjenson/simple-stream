import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Menu } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { globalStyles } from '../global/globalStyles';
import { addToQueue, formatSeconds } from '../global/utils';
import { Song } from '../types';

interface Props {
  item: Song;
  handleClick?: (item: Song) => void;
  shouldHighLight?: boolean;
  fromQueue?: boolean;
}

const SongItem = (props: Props) => {
  const {
    item,
    handleClick,
    shouldHighLight = false,
    fromQueue = false,
  } = props;
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const handleAddorRemoveToQueue = (item: Song) => {
    console.log('add or removed from/to queue');
  };

  return (
    <View
      style={{
        ...styles.horizonatalCard,
        backgroundColor: shouldHighLight ? 'grey' : 'transparent',
      }}>
      <MaterialIcons name="reorder" size={15} style={{ paddingRight: 2 }} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          maxWidth: '88%',
        }}
        onPress={() => handleClick(item)}>
        <Image
          style={styles.thumbnail}
          source={{ uri: item.thumbnails[0].url }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...globalStyles.title, flexWrap: 'wrap' }}>
            {item.name}
          </Text>
          <Text>{item.artist.name}</Text>
          <Text>{formatSeconds(item.duration)}</Text>
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
            onPress={() => handleAddorRemoveToQueue(item)}
            title={`${fromQueue ? 'Remove from' : 'Add to'} queue`}
          />
          <Menu.Item onPress={() => {}} title="Play next" />
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
