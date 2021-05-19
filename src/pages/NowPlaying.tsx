import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import { formatSeconds } from '../../global/utils';
import { useSelector } from 'react-redux';
import LyricsComponent from '../components/LyricsComponent';
import { Song } from '../components/DisplaySongs';

const { width } = Dimensions.get('window');

const NowPlaying = ({ navigation }) => {
  const currentSong = useSelector<Song[]>(
    state => state.songReducer.currentSong,
  );
  const isUrlLoading = false;
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    TrackPlayer.getState()
      .then(state => {
        console.log(state);
        if (state === TrackPlayer.STATE_PLAYING) {
          TrackPlayer.pause();
          setIsPaused(true);
        } else {
          TrackPlayer.play();
          setIsPaused(false);
        }
      })
      .catch(err => console.log('error in getting state' + err));
  };

  const { position, bufferedPosition, duration } = useTrackPlayerProgress(
    500,
    undefined,
  );
  return (
    currentSong && (
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
        <ImageBackground
          source={{ uri: currentSong?.artwork }}
          blurRadius={50}
          style={{
            flex: 1,
            padding: 30,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginTop: 60,
              marginBottom: 50,
            }}>
            <Image
              style={styles.thumbnail}
              source={{ uri: currentSong.artwork }}
            />
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <Text style={styles.title}>{currentSong.title}</Text>
              <Text style={{ fontWeight: '200' }}>{currentSong.artist}</Text>
            </View>
          </View>

          <View>
            <View style={{ position: 'relative', height: 40 }}>
              <Slider
                style={{ width: width - 40, position: 'absolute' }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={position && duration ? position / duration : 0}
                onValueChange={ratio => TrackPlayer.seekTo(duration * ratio)}
              />
              <Slider
                style={{ width: width - 40, position: 'absolute' }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={bufferedPosition ? bufferedPosition / duration : 0}
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
              // onPress={() => {}}
            />

            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name="skip-previous"
                onPress={() => TrackPlayer.skipToPrevious()}
                size={70}
                color={isUrlLoading ? 'grey' : 'black'}
                // borderRadius={currentPlayIndex !== 0}
              />
              <MaterialIcons
                name={isPaused ? 'play-circle-fill' : 'pause-circle-filled'}
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
          <View
            style={{
              maxHeight: 500,
              overflow: 'hidden',
              backgroundColor: '#ffcccb',
              borderRadius: 20,
              paddingHorizontal: 15,
            }}>
            <LyricsComponent song={currentSong} />
          </View>
        </ImageBackground>
      </ScrollView>
    )
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  thumbnail: {
    height: width * 0.75,
    width: width * 0.75,
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
