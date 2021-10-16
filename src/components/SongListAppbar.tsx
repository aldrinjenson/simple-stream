import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { shuffleQueue } from '../redux/actions/queueActions';

const SongListAppbar = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ marginBottom: 20 }}>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="shuffle"
          onPress={() => dispatch(shuffleQueue())}
        />
      </Appbar>
    </View>
  );
};

export default SongListAppbar;

const styles = StyleSheet.create({
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
});
