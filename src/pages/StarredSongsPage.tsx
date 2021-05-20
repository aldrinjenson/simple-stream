import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { globalStyles } from '../global/globalStyles';
import DisplaySongs from '../components/DisplaySongs';
import { songData } from '../components/data';

interface Props {}

const StarredSongsPage = (props: Props) => {
  return (
    <View style={{ backgroundColor: '#ccc', ...globalStyles.pageContainer }}>
      <Text style={globalStyles.pageTitle}>Starred Songs</Text>
      <DisplaySongs songs={songData} />
    </View>
  );
};

export default StarredSongsPage;

const styles = StyleSheet.create({});
