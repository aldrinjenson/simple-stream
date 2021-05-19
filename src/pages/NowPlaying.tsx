import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import { formatSeconds } from '../../global/utils';

const { width } = Dimensions.get('window');
interface Track {
  title: string;
  artwork?: string;
  artist: string;
  album?: string;
}

const NowPlaying = ({ navigation }) => {
  const [track, setTrack] = useState<null | Track>(null);
  const isUrlLoading = false;
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Set the initial track title:
    (async () => {
      const trackId = await TrackPlayer.getCurrentTrack();
      if (!mounted || !trackId) return;
      const currentTrack = await TrackPlayer.getTrack(trackId);
      if (!mounted) return;
      setTrack(currentTrack);
    })();

    // Set the track title whenever the track changes:
    const trackListener = TrackPlayer.addEventListener(
      'playback-track-changed',
      data => {
        if (!mounted) return;
        TrackPlayer.getTrack(data.nextTrack)
          .then(currentTrack => currentTrack && setTrack(currentTrack))
          .catch(err => console.log('error' + err));
      },
    );

    const stateListener = TrackPlayer.addEventListener(
      'playback-state',
      data => {
        TrackPlayer.getState()
          .then(playerState => {
            console.log(playerState);
          })
          .catch(err => console.log('error' + err));
      },
    );

    return () => {
      mounted = false;
      trackListener.remove();
      stateListener.remove();
    };
  }, []);

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
    track && (
      <ImageBackground
        source={{ uri: track?.artwork }}
        blurRadius={50}
        style={{
          flex: 1,
          padding: 30,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 70,
          }}>
          <Image style={styles.thumbnail} source={{ uri: track.artwork }} />
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={styles.title}>{track.title}</Text>
            <Text style={{ fontWeight: '200' }}>{track.title}</Text>
          </View>
        </View>

        <View>
          <View style={{ position: 'relative' }}>
            <Slider
              style={{ width: width - 40, height: 40, position: 'absolute' }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={position && duration ? position / duration : 0}
              onValueChange={ratio => TrackPlayer.seekTo(duration * ratio)}
            />
            <Slider
              style={{ width: width - 40, height: 40 }}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="red"
              maximumTrackTintColor="grey"
              value={bufferedPosition ? bufferedPosition : 20}
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
            onPress={() => {}}
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
            // onPress={() => navigation.navigate('UpNext')}
          />
        </View>
      </ImageBackground>
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
    marginBottom: 10,
  },
  controlButtons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});
