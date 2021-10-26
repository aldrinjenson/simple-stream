import React from 'react';
import TextTicker from 'react-native-text-ticker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../hooks/customReduxHooks';
import { sentenceCase } from '../global/utils';
import { Song } from '../types';
import useHandlePause from '../hooks/useHandlePause';
import { playNextSong } from '../redux/actions/queueActions';
import { useDispatch } from 'react-redux';
import { Text, useTheme } from 'react-native-paper';

const BottomBar = () => {
  const navigation = useNavigation();
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const isPlaying = useAppSelector<boolean>(
    state => state.songReducer.isPlaying,
  );
  const { handlePause } = useHandlePause();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const isUrlLoading = false;

  if (!currentSong?.url) {
    return null;
  }
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          maxWidth: '80%',
        }}
        onPress={() => navigation.navigate('NowPlaying')}>
        <Image
          style={styles.tabImage}
          source={{
            uri: currentSong.thumbnails[0].url,
          }}
        />
        <View style={{ marginLeft: 10, width: '70%' }}>
          <TextTicker
            style={{ fontSize: 18 }}
            duration={13000}
            marqueeDelay={1000}>
            {sentenceCase(currentSong.name)}
          </TextTicker>
          <Text>{currentSong.artist.name}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons
          name={isPlaying ? 'pause-circle-filled' : 'play-circle-fill'}
          color={isUrlLoading ? 'grey' : colors.primary}
          size={45}
          onPress={handlePause}
        />

        <MaterialIcons
          onPress={() => dispatch(playNextSong())}
          name="skip-next"
          size={45}
          color="white"
        />
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  tabImage: {
    width: 60,
    height: 60,
  },
  bottomBar: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '6%',
  },
});
