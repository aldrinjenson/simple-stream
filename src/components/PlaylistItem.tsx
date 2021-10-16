import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Title, Paragraph, Menu } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { deletePlaylist } from '../redux/actions/playlistActions';
import { setSongQueue } from '../redux/actions/queueActions';
import { playSong } from '../redux/actions/songActions';
import { Playlist } from '../types';

interface Props {
  playlist: Playlist;
  shouldHideMenu?: boolean;
  onPress: () => void;
}

const PlaylistItem = ({ playlist, shouldHideMenu, onPress }: Props) => {
  const { title, songs, id: playlistId, canBeDeleted } = playlist;
  const dispatch = useDispatch();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handlePlaylistDelete = () => {
    dispatch(deletePlaylist(playlistId));
  };

  const handlePlaylistPlay = () => {
    dispatch(playSong(songs[0]));
    dispatch(setSongQueue(songs));
  };

  return (
    <View
      style={{
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'grey',
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          flexGrow: 1,
        }}>
        <Image
          style={{ width: 75, height: 75 }}
          source={
            songs[0]?.thumbnails
              ? { uri: songs[0]?.thumbnails[1].url }
              : require('../assets/music.png')
          }
        />
        <View style={{ marginLeft: 20 }}>
          <Title>{title}</Title>
          <Paragraph>
            {songs.length} song{songs.length > 1 && 's'}
          </Paragraph>
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
              style={{ padding: 10 }}
            />
          }>
          <Menu.Item onPress={handlePlaylistPlay} title="Play Songs" />
          {canBeDeleted ? (
            <Menu.Item onPress={handlePlaylistDelete} title="Delete Playlist" />
          ) : null}
        </Menu>
      )}
    </View>
  );
};

export default PlaylistItem;

const styles = StyleSheet.create({});
