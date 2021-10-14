import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-simple-toast';

import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import songData from '../data';
import SearchInput from '../components/SearchInput';
import { Song } from '../types';
import { apiDispatch, getSuggestedSongsList } from '../global/utils';
import { playSong } from '../redux/actions/songActions';
import { useDispatch } from 'react-redux';
import YoutubeMusicApi from 'youtube-music-api';
import { SET_SONG_DOWNLADING } from '../redux/constants/playlistConstants';
const api = new YoutubeMusicApi();

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Song[]>(songData);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    api
      .initalize()
      .then(() => console.log('Api initalized'))
      .catch((err: string) => console.log('error in initialising API: ' + err));
    dispatch(apiDispatch(SET_SONG_DOWNLADING)); // place to be changed
  }, [dispatch]);

  const handleSearch = async (query: string) => {
    try {
      const { content: songs } = await api.search(query, 'song');
      setSearchResults(songs);
    } catch (error) {
      console.error(error);
      Toast.show('There seems to be some isses with your network.');
      api.initialize();
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
      <DisplaySongs songs={searchResults} handleClick={handleClick} />
    </View>
  );
};

export default SearchPage;
