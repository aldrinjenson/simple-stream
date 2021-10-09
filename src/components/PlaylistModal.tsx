import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useAppSelector } from '../hooks/customReduxHooks';
import { Song } from '../types';
import PlaylistItem from './PlaylistItem';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  song: Song;
}

const PlaylistModal = (props: Props) => {
  const { visible, onDismiss, song } = props;
  const allPlaylists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  const addToPlaylist = () => {
    console.log('hi');
    console.log(song.name);
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Choose Playlist</Dialog.Title>

        <Dialog.ScrollArea>
          <ScrollView>
            {allPlaylists.map(playlist => (
              <PlaylistItem
                shouldHideMenu={true}
                onPress={addToPlaylist}
                key={playlist.id}
                playlist={playlist}
              />
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PlaylistModal;

const styles = StyleSheet.create({});
