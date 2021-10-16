import React, { useMemo, useRef } from 'react';
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
import useHandlePause from '../hooks/useHandlePause';
import useSongPlayActions from '../hooks/useSongPlayActions';
import { useDispatch } from 'react-redux';
import { toggleFavouriteSong } from '../redux/actions/songActions';
import useSongStatus from '../hooks/useSongStatus';
import { playNextSong, playPreviousSong } from '../redux/actions/queueActions';

// try webscraping from this one to get timestamped lyrics
// https://www.megalobiz.com/search/all?qry=hello+adele

const { width } = Dimensions.get('window');

const NowPlaying = ({ navigation }) => {
  const currentSong = useAppSelector<Song>(
    state => state.songReducer.currentSong,
  );
  const isPlaying = useAppSelector<Boolean>(
    state => state.songReducer.isPlaying,
  );
  const isUrlLoading = useAppSelector<Boolean>(
    state => state.songReducer.isSongLoading,
  );
  const seekPosition = useAppSelector(state => state.songReducer.seekPosition);
  const duration = useMemo(() => currentSong?.duration / 1000, [currentSong]);
  const { handlePause } = useHandlePause();
  const { isFavourite } = useSongStatus(currentSong);
  const { handleSeek } = useSongPlayActions();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const imageIndex =
    currentSong.thumbnails?.length > 1 ? currentSong.thumbnails.length - 1 : 0;

  if (!currentSong.url) {
    navigation.goBack();
  }

  return (
    <ScrollView ref={scrollRef} style={{ flex: 1 }} nestedScrollEnabled={true}>
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
            <Text style={{ fontWeight: '200' }}>{currentSong.artist.name}</Text>
          </View>
        </View>

        <View>
          <View
            style={{
              position: 'relative',
              height: 30,
              width: '100%',
              alignSelf: 'center',
            }}>
            <Slider
              style={{ position: 'absolute', width: '100%' }}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={seekPosition}
              onValueChange={handleSeek}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{formatSeconds(seekPosition)}</Text>
            <Text>{formatSeconds(duration)}</Text>
          </View>
        </View>

        <View style={styles.controlButtons}>
          <MaterialCommunityIcons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={30}
            color="black"
            onPress={() => dispatch(toggleFavouriteSong(currentSong))}
          />

          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons
              name="skip-previous"
              onPress={() => dispatch(playPreviousSong())}
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
              onPress={() => dispatch(playNextSong())}
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
          position={seekPosition}
        />
      </ImageBackground>
    </ScrollView>
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
