import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline } from 'react-native-paper';
import PlaylistCard from '../components/PlaylistCard';
import { useAppSelector } from '../hooks/customReduxHooks';
import { Playlist } from '../types';

interface Props {}

const PlaylistsPage = (props: Props) => {
  const playlists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Headline>Playlists</Headline>
        <View style={{}}>
          {playlists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistsPage;

const styles = StyleSheet.create({});
