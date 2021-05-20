import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';
import { useTrackPlayerProgress } from 'react-native-track-player';
import { Song } from './DisplaySongs';
interface TimeStampedLyricsProps {
  lyrics: { seconds: number; lyrics: string }[];
  shouldScroll: boolean;
}

const TimeStampedLyrics = React.forwardRef(
  (props: TimeStampedLyricsProps, forwardedRef) => {
    const { lyrics, shouldScroll } = props;
    const { position } = useTrackPlayerProgress(1000, undefined);
    return (
      <View style={{ marginBottom: 20 }}>
        {lyrics.map(({ seconds, lyrics: lyric }, index) => {
          let color = position > seconds ? 'grey' : 'black';
          let fontSize = 17;
          if (position >= seconds && position <= lyrics[index + 1]?.seconds) {
            color = 'red';
            // fontSize = 17;
            shouldScroll &&
              forwardedRef?.scrollTo({
                x: 0,
                y: index * 20,
                animated: true,
              });
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
  },
);

const RegularLyrics = ({ lyrics }: { lyrics: string[] }) => {
  return (
    <View>
      {lyrics.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </View>
  );
};
interface LyricProps {
  song: Song;
}

const LyricsComponent = React.forwardRef((props: LyricProps, forwardedRef) => {
  const {
    song: { lyrics, timeStamped },
  } = props;
  const lyricLineRef = useRef();
  const [shouldScroll, setShouldScroll] = useState(true);
  return (
    <View style={styles.lyricsComponent}>
      {lyrics ? (
        <>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TouchableOpacity
              style={{ flexGrow: 1 }}
              onPress={() => forwardedRef?.scrollToEnd({ animated: true })}>
              <Text
                style={{
                  fontSize: 20,
                  padding: 10,
                }}>
                Lyrics
              </Text>
            </TouchableOpacity>
            {timeStamped && (
              <View style={{ paddingTop: 10, paddingRight: 10 }}>
                <Switch
                  value={shouldScroll}
                  disabled={!timeStamped}
                  onValueChange={() => setShouldScroll(val => !val)}
                  color="green"
                />
                <Text>Scroll</Text>
              </View>
            )}
          </View>
          <ScrollView ref={lyricLineRef} nestedScrollEnabled={true}>
            {timeStamped ? (
              <TimeStampedLyrics
                ref={lyricLineRef.current}
                shouldScroll={shouldScroll}
                lyrics={lyrics}
              />
            ) : (
              <RegularLyrics lyrics={lyrics} />
            )}
          </ScrollView>
        </>
      ) : (
        <Text style={styles.noLyricsText}>No Lyrics available</Text>
      )}
    </View>
  );
});

export default React.memo(LyricsComponent);

const styles = StyleSheet.create({
  lyricsComponent: {
    maxHeight: 500,
    overflow: 'hidden',
    backgroundColor: '#ffcccb',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  noLyricsText: { color: 'grey', textAlign: 'center' },
});
