import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { globalStyles } from '../global/globalStyles';
import { formatSeconds } from '../global/utils';
import { Song } from './DisplaySongs';

interface Props {
  item: Song;
  handleClick?: (item: Song) => void;
  shouldHighLight?: boolean;
}

const SongItem = (props: Props) => {
  const {
    item,
    handleClick,
    // item,
    shouldHighLight = false,
    // iconName,
    // secondaryAction = () => {},
  } = props;
  return (
    <View
      style={{
        ...styles.horizonatalCard,
        backgroundColor: shouldHighLight ? 'grey' : 'transparent',
        justifyContent: 'space-between',
      }}>
      <MaterialIcons name="reorder" size={15} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          maxWidth: '88%',
        }}
        onPress={() => handleClick(item)}>
        <Image style={styles.bookImage} source={{ uri: item.artwork }} />
        <View style={{ flexShrink: 1 }}>
          <Text style={{ ...globalStyles.title, flexWrap: 'wrap' }}>
            {item.title}
          </Text>
          <Text>{item.artist}</Text>
          <Text>{formatSeconds(item.duration)}</Text>
        </View>
      </TouchableOpacity>
      <MaterialIcons
        // name={shouldHighLight ? "music-note" : iconName}
        name={'music-note'}
        size={30}
        style={{ marginHorizontal: 7 }}
        color={'green'}
        // onPress={() => secondaryAction(item)}
      />
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
  bookImage: {
    height: 75,
    width: 75,
    marginHorizontal: 16,
  },
});
