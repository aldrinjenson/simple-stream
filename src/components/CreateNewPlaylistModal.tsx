import React, { useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { addNewPlaylist } from '../redux/actions/playlistActions';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const CreateNewPlaylistModal = (props: Props) => {
  const { visible, onDismiss } = props;
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newPlaylist = {
      title,
      canBeDeleted: true,
      createdAt: new Date().getTime(),
      songs: [],
      id: new Date().getTime(),
    };
    dispatch(addNewPlaylist(newPlaylist));
    Toast.show('New playlist created.');
    setTitle('');
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Create New Playlist</Dialog.Title>
        <Dialog.Content>
          <TextInput
            value={title}
            onChangeText={text => setTitle(text)}
            label="Enter title"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button disabled={!title.length} onPress={handleSubmit}>
            Create
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CreateNewPlaylistModal;
