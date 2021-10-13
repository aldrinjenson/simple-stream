import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline } from 'react-native-paper';
import PlaylistItem from '../components/PlaylistItem';
import { useAppSelector } from '../hooks/customReduxHooks';
import { Playlist } from '../types';

interface Props {}

const PlaylistsListPage = (props: Props) => {
  const playlists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );

  const favourites = useAppSelector<Playlist>(
    state => state.playlistReducer.favourites,
  );
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Headline>Playlists</Headline>
        <View style={{}}>
          {[...playlists, favourites].map(playlist => (
            <PlaylistItem
              onPress={() =>
                navigation.navigate('PlaylistSongsPage', {
                  playlistId: playlist.id,
                })
              }
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistsListPage;

const styles = StyleSheet.create({});
