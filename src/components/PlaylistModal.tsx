import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import { addSongToPlaylist } from '../redux/actions/playlistActions';
import { Song, Playlist } from '../types';
import PlaylistItem from './PlaylistItem';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  song: Song;
}

const PlaylistModal = (props: Props) => {
  const { visible, onDismiss, song } = props;
  const dispatch = useDispatch();
  const allPlaylists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );

  const addToPlaylist = (plId: number) => {
    Toast.show('Adding to playlist');
    dispatch(addSongToPlaylist(plId, song));
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Choose Playlist</Dialog.Title>
        <Dialog.Content>
          <Dialog.ScrollArea>
            <ScrollView>
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
      </Dialog>
    </Portal>
  );
};

export default PlaylistModal;

const styles = StyleSheet.create({});
