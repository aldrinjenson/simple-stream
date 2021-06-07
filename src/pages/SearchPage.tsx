import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import { songData } from '../components/data';
import SearchInput from '../components/SearchInput';
import axios from 'axios';
import { API_URL } from '../../config';
import { Song } from '../types';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Song[]>(songData);

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

  return (
    <View style={{ backgroundColor: '#ccc', ...globalStyles.pageContainer }}>
      <Text style={globalStyles.pageTitle}>Browse Songs</Text>
      <SearchInput handleSearch={handleSearch} />
      <DisplaySongs songs={searchResults} />
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({});
