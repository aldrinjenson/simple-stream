import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Headline } from 'react-native-paper';
import PlaylistItem from '../components/PlaylistItem';
import { useAppSelector } from '../hooks/customReduxHooks';
import { Playlist } from '../types';
import CreateNewPlaylistModal from '../components/CreateNewPlaylistModal';

interface Props {}

const PlaylistsListPage = (props: Props) => {
  const playlists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  const [modalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, marginBottom: 40, paddingHorizontal: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginVertical: 10,
        }}>
        <Headline>Playlists</Headline>
        <MaterialIcons
          name="playlist-add"
          size={40}
          color="green"
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <CreateNewPlaylistModal
        visible={modalVisible}
        onDismiss={() => setIsModalVisible(false)}
      />
      <ScrollView>
        {playlists.map(playlist => (
          <PlaylistItem
            onPress={() =>
              navigation.navigate('PlaylistSongsPage', {
                playlistId: playlist.id,
              })
            }
            key={playlist.id}
            playlist={playlist}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PlaylistsListPage;
