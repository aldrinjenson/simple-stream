import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTrackPlayerProgress } from 'react-native-track-player';
import { Lyric, Song } from './DisplaySongs';

const TimeStampedLyrics = ({ lyrics }) => {
  const { position } = useTrackPlayerProgress(1000, undefined);
  return (
    <View>
      {lyrics.map((lyricElement, index) => {
        const { seconds, lyrics: lyric } = lyricElement;
        let color = position > seconds ? 'grey' : 'black';
        if (position > seconds && position <= lyrics[index + 1]?.seconds) {
          color = 'red';
        }
        const fontSize =
          position >= seconds && position <= lyrics[index + 1]?.seconds
            ? 20
            : 15;
        return (
          <Text
            style={{
              ...styles.lyricLine,
              color,
              fontSize,
            }}
            key={index}>
            {lyric}
          </Text>
        );
      })}
    </View>
  );
};

const RegularLyrics = ({ lyrics }) => {
  return (
    <View>
      {lyrics.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </View>
  );
};
interface Props {
  song: Song;
}

const LyricsComponent = (props: Props) => {
  const {
    song: { lyrics, timeStamped },
  } = props;
  return (
    <View style={{ paddingBottom: 100, paddingTop: 10 }}>
      {lyrics ? (
        <View>
          <Text
            style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>
            Lyrics
          </Text>
          <ScrollView nestedScrollEnabled={true}>
            {timeStamped ? (
              <TimeStampedLyrics lyrics={lyrics} />
            ) : (
              <RegularLyrics lyrics={lyrics} />
            )}
          </ScrollView>
        </View>
      ) : (
        <Text>No Lyrics available</Text>
      )}
    </View>
  );
};

export default LyricsComponent;

const styles = StyleSheet.create({
  lyricLine: {
    // paddingHorizontal: 2,
  },
});
