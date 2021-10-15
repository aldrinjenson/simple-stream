import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import YoutubeMusicApi from 'youtube-music-api';
import { useDispatch } from 'react-redux';

import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import SearchInput from '../components/SearchInput';
import { Song } from '../types';
import { apiDispatch, getSuggestedSongsList } from '../global/utils';
import { playSong } from '../redux/actions/songActions';
import { SET_SONG_DOWNLADING } from '../redux/constants/playlistConstants';
import LoadingScreen from '../components/LoadingScreen';
const api = new YoutubeMusicApi();

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    api
      .initalize()
      .then(() => console.log('Api initalized'))
      .catch((err: string) => console.log('error in initialising API: ' + err));
    dispatch(apiDispatch(SET_SONG_DOWNLADING)); // Move this from here to app
  }, [dispatch]);

  const handleSearch = async (query: string) => {
    try {
      setisLoading(true);
      const { content: songs } = await api.search(query, 'song');
      setSearchResults(songs);
    } catch (error) {
      console.error(error);
      Toast.show('There seems to be some isses with your network.');
      api.initialize();
    } finally {
      setisLoading(false);
    }
  };

  const handleClick = (item: Song) => {
    dispatch(playSong(item));
    dispatch(getSuggestedSongsList(item.videoId));
  };

  return (
    <View style={{ backgroundColor: '#ccc', ...globalStyles.pageContainer }}>
      <Text style={globalStyles.pageTitle}>Browse Songs</Text>
      <SearchInput handleSearch={handleSearch} />
      {isLoading ? (
        <LoadingScreen />
      ) : searchResults.length ? (
        <DisplaySongs songs={searchResults} handleClick={handleClick} />
      ) : (
        <View>
          <Text style={{ textAlign: 'center', marginTop: '35%' }}>
            Try searching for your favourite band or artists
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
