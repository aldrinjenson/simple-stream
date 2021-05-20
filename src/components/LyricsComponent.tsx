import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTrackPlayerProgress } from 'react-native-track-player';
import { Song } from './DisplaySongs';

type timeStampedLyrics = { seconds: number; lyrics: string }[];

const TimeStampedLyrics = ({ lyrics }: { lyrics: timeStampedLyrics }) => {
  const { position } = useTrackPlayerProgress(1000, undefined);
  return (
    <View>
      {lyrics.map(({ seconds, lyrics: lyric }, index) => {
        let color = position > seconds ? 'grey' : 'black';
        let fontSize = 15;
        if (position >= seconds && position <= lyrics[index + 1]?.seconds) {
          color = 'red';
          fontSize = 17;
        }
        return (
          <Text
            style={{
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

const RegularLyrics = ({ lyrics }: { lyrics: string[] }) => {
  return (
    <View>
      {lyrics.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </View>
  );
};

const LyricsComponent = ({ song: { lyrics, timeStamped } }: { song: Song }) => {
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
        <Text style={{ color: 'grey', textAlign: 'center' }}>
          No Lyrics available
        </Text>
      )}
    </View>
  );
};

export default React.memo(LyricsComponent);

const styles = StyleSheet.create({
  lyricLine: {
    // paddingHorizontal: 2,
  },
});
