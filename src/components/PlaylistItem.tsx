import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Title, Paragraph, Menu } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { deletePlaylist } from '../redux/actions/playlistActions';
import { Playlist } from '../types';

interface Props {
  playlist: Playlist;
  shouldHideMenu?: boolean;
  onPress: () => void;
}

const PlaylistItem = ({ playlist, shouldHideMenu, onPress }: Props) => {
  const { title, songs, id: playlistId } = playlist;
  const dispatch = useDispatch();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handlePlaylistDelete = () => {
    dispatch(deletePlaylist(playlistId));
  };

  return (
    <View
      style={{
        marginVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'grey',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingVertical: 5,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'red',
          flexDirection: 'row',
          flexGrow: 1,
        }}>
        <Image
          style={{ width: 75, height: 75 }}
          source={{ uri: songs[0]?.thumbnails[1].url }}
        />
        <View style={{ marginLeft: 20 }}>
          <Title>{title}</Title>
          <Paragraph>{songs.length} songs</Paragraph>
        </View>
      </TouchableOpacity>
      {!shouldHideMenu && (
        <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          anchor={
            <MaterialIcons
              onPress={() => setIsMenuVisible(true)}
              name="more-vert"
              size={30}
              style={{
                padding: 10,
                backgroundColor: 'green',
              }}
            />
          }>
          <Menu.Item onPress={() => {}} title="Download" />
          <Menu.Item onPress={handlePlaylistDelete} title="Delete Playlist" />
        </Menu>
      )}
    </View>
  );
};

export default PlaylistItem;

const styles = StyleSheet.create({});
