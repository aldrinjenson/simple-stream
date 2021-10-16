import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Subheading } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import { addSongToPlaylist } from '../redux/actions/playlistActions';
import { Song, Playlist } from '../types';
import CreateNewPlaylistModal from './CreateNewPlaylistModal';
import PlaylistItem from './PlaylistItem';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  song: Song;
}

const PlaylistModal = (props: Props) => {
  const { visible, onDismiss, song } = props;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [, , ...allPlaylists] = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );

  const addToPlaylist = (plId: number) => {
    dispatch(addSongToPlaylist(plId, song));
    onDismiss();
  };
  return (
    <Portal>
      <CreateNewPlaylistModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
      <Dialog visible={visible} onDismiss={onDismiss}>
        <View style={{ maxHeight: '75%' }}>
          <Dialog.Title>Choose Playlist</Dialog.Title>
          <Dialog.Content>
            <Dialog.ScrollArea>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    flexDirection: 'row',
                  }}>
                  <MaterialIcons name="playlist-add" size={40} color="grey" />
                  <Subheading> Create new playlist?</Subheading>
                </TouchableOpacity>
                {allPlaylists.map(playlist => (
                  <PlaylistItem
                    shouldHideMenu={true}
                    onPress={() => addToPlaylist(playlist.id)}
                    key={playlist.id}
                    playlist={playlist}
                  />
                ))}
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>Cancel</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default PlaylistModal;
