import React, { useMemo } from 'react';
import { View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { MenuItem, Playlist, Song } from '../types';
import SongItem from './SongItem';
import { PLAYLIST_SONGS_SCREEN, SONG_QUEUE_SCREEN } from '../constants';
import { setSongQueue } from '../redux/actions/queueActions';
import { updatePlaylist } from '../redux/actions/playlistActions';
import { useAppSelector } from '../hooks/customReduxHooks';

interface Props {
  songs: Song[];
  handleClick: (item: Song) => void;
  extraMenuItems?: MenuItem[];
}

const draggableScreens = [PLAYLIST_SONGS_SCREEN, SONG_QUEUE_SCREEN];

const DisplaySongs = (props: Props) => {
  const { songs, handleClick, extraMenuItems } = props;
  const dispatch = useDispatch();
  const playlists = useAppSelector<Playlist[]>(
    state => state.playlistReducer.playlists,
  );
  const { name: screenName, params } = useRoute();
  const canDrag = useMemo(() => draggableScreens.includes(screenName), [
    screenName,
  ]);

  const handleDragEnd = (updatedSongsList: Song[]) => {
    switch (screenName) {
      case SONG_QUEUE_SCREEN:
        dispatch(setSongQueue(updatedSongsList));
        break;
      case PLAYLIST_SONGS_SCREEN:
        const currPlaylist: Playlist = playlists.find(
          pl => pl.id === params?.playlistId,
        );
        dispatch(updatePlaylist({ ...currPlaylist, songs: updatedSongsList }));
        break;
      default:
        return;
    }
  };

  return (
    <View style={{ flex: 1, marginBottom: 5 }}>
      {songs.length ? (
        <DraggableFlatList
          data={songs}
          keyExtractor={(item, index) => index.toString()}
          onDragEnd={({ data }) => handleDragEnd(data)}
          renderItem={renderProps => (
            <SongItem
              extraMenuItems={extraMenuItems}
              item={renderProps.item}
              handleClick={handleClick}
              renderProps={renderProps}
              canDrag={canDrag}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default DisplaySongs;
