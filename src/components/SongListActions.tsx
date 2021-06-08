import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Appbar,
} from 'react-native-paper';
import useSongPlayActions from '../hooks/useSongPlayActions';

interface ModalProps {
  show: boolean;
  setShow: (arg: boolean) => void;
}

const AddToPlaylistModal = ({ show, setShow }: ModalProps) => {
  return (
    <Portal>
      <Modal visible={show} onDismiss={() => setShow(false)}>
        <View
          style={{
            height: '60%',
            backgroundColor: 'grey',
            alignItems: 'center',
            padding: 20,
            marginHorizontal: 20,
          }}>
          <Text>Add to Playlist </Text>
        </View>
      </Modal>
    </Portal>
  );
};

const SongListActions = () => {
  const { shuffleQueue } = useSongPlayActions();
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState<boolean>(
    false,
  );

  return (
    <View style={{ marginBottom: 20 }}>
      {showAddToPlaylistModal && (
        <AddToPlaylistModal
          show={showAddToPlaylistModal}
          setShow={setShowAddToPlaylistModal}
        />
      )}
      <Appbar style={styles.bottom}>
        <Appbar.Action icon="shuffle" onPress={shuffleQueue} />
        <Appbar.Action
          icon="playlist-plus"
          onPress={() => setShowAddToPlaylistModal(true)}
        />
      </Appbar>
    </View>
  );
};

export default SongListActions;

const styles = StyleSheet.create({
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
});
