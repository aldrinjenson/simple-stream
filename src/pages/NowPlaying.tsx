import React, { useEffect, useRef, useState } from 'react';
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
import { formatSeconds, sentenceCase } from '../global/utils';
import LyricsComponent from '../components/LyricsComponent';
import { useAppSelector } from '../hooks/customReduxHooks';
import { Song } from '../types';
import SoundPlayer from 'react-native-sound-player';
import useHandlePause from '../hooks/useHandlePause';
import useSongPlayActions from '../hooks/useSongPlayActions';

const { width } = Dimensions.get('window');

const NowPlaying = ({ navigation }) => {
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const isPlaying = useAppSelector(state => state.songReducer.isPlaying);
  const duration = currentSong?.duration / 1000;
  const [position, setPosition] = useState(0);
  const { handlePause, handleSeek } = useHandlePause();
  const { playNextSong, playPreviousSong } = useSongPlayActions();
  const isUrlLoading = false;

  useEffect(() => {
    const songPositionPoller = setInterval(() => {
      SoundPlayer.getInfo().then(info => setPosition(info.currentTime));
    }, 500);
    return () => clearInterval(songPositionPoller);
  }, [currentSong]);

  const imageIndex = currentSong?.thumbnails?.length - 2;

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
              source={{ uri: currentSong.thumbnails[imageIndex].url }}
            />
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <Text style={styles.title}>{sentenceCase(currentSong.name)}</Text>
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
                onValueChange={seconds => handleSeek(seconds)}
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
                onPress={playPreviousSong}
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
                onPress={playNextSong}
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
          <LyricsComponent
            ref={scrollRef.current}
            song={currentSong}
            position={position}
          />
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
