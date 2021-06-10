import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import { songData } from '../components/data';
import SearchInput from '../components/SearchInput';
import axios from 'axios';
import { API_URL } from '../../config';
import { Song } from '../types';
import { getSuggestedSongsList } from '../global/utils';
import { playSong } from '../redux/actions/songActions';
import { useDispatch } from 'react-redux';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Song[]>(songData);
  const dispatch = useDispatch<any>();

  const handleSearch = (query: string) => {
    axios
      .get(`${API_URL}/search/${query}`)
      .then(res => {
        setSearchResults(res.data);
      })
      .catch(err => {
        console.log(`error in searching: ${err}`);
      });
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
