import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import { formatSeconds } from '../global/utils';
import { useSelector } from 'react-redux';
import LyricsComponent from '../components/LyricsComponent';
import { Switch } from 'react-native-paper';
import { Song } from '../types';

const { width } = Dimensions.get('window');

const NowPlaying = ({ navigation }) => {
  // const currentSong = useSelector<null | Song>(
  //   state => state.songReducer.currentSong,
  // );
  const currentSong: Song = {};
  const isPlaying = useSelector<null | Song>(
    state => state.songReducer.isPlaying,
  );
  const isUrlLoading = false;

  const handlePause = () => {
    TrackPlayer.getState()
      .then(state => {
        if (state === TrackPlayer.STATE_PLAYING) {
          TrackPlayer.pause();
        } else {
          TrackPlayer.play();
        }
      })
      .catch(err => console.log('error in getting state' + err));
  };

  const { position, bufferedPosition, duration } = useTrackPlayerProgress(
    1000,
    undefined,
  );
  const scrollRef = useRef(null);
  return (
    currentSong && (
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        nestedScrollEnabled={true}>
        <ImageBackground
          source={{ uri: currentSong?.thumbnails[0].url }}
          blurRadius={50}
          style={{
            flex: 1,
            padding: 30,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 50,
            }}>
            <Image
              style={styles.thumbnail}
              source={{ uri: currentSong.thumbnails[1].url }}
            />
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <Text style={styles.title}>{currentSong.name}</Text>
              <Text style={{ fontWeight: '200' }}>
                {currentSong.artist.name}
              </Text>
            </View>
          </View>

          <View>
            <View
              style={{ position: 'relative', height: 30, width: width * 0.85 }}>
              <Slider
                style={{ position: 'absolute', width: '100%' }}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={position}
                onValueChange={val => TrackPlayer.seekTo(val)}
              />
              <Slider
                style={{ position: 'absolute', width: '100%' }}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={bufferedPosition}
                disabled
              />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{formatSeconds(position)}</Text>
              <Text>{formatSeconds(duration)}</Text>
            </View>
          </View>

          <View style={styles.controlButtons}>
            <MaterialCommunityIcons
              name={'repeat' || 'repeat-off' || 'repeat-once'}
              size={30}
              color="black"
            />

            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name="skip-previous"
                onPress={() => TrackPlayer.skipToPrevious()}
                size={70}
                color={isUrlLoading ? 'grey' : 'black'}
              />
              <MaterialIcons
                name={isPlaying ? 'pause-circle-filled' : 'play-circle-fill'}
                size={70}
                color={isUrlLoading ? 'grey' : 'green'}
                onPress={handlePause}
              />

              <MaterialIcons
                onPress={() => TrackPlayer.skipToNext()}
                name="skip-next"
                size={70}
                color={isUrlLoading ? 'grey' : 'black'}
              />
            </View>

            <MaterialIcons
              name="queue-music"
              size={30}
              color="black"
              onPress={() => navigation.navigate('SongQueue')}
            />
          </View>
          <LyricsComponent ref={scrollRef.current} song={currentSong} />
        </ImageBackground>
      </ScrollView>
    )
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  thumbnail: {
    height: width * 0.85,
    width: width * 0.85,
  },
  title: {
    fontWeight: '400',
    fontSize: 20,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  controlButtons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
});
