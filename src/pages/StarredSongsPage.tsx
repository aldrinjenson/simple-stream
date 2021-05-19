import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../global/globalStyles';
import { songData } from '../components/data';
import DisplaySongs from '../components/DisplaySongs';

interface Props {}

const StarredSongsPage = (props: Props) => {
  return (
    <View style={{ backgroundColor: '#ccc', ...globalStyles.pageContainer }}>
      <Text>Starred Songs</Text>
      <DisplaySongs songs={songData} />
    </View>
  );
};

export default StarredSongsPage;

const styles = StyleSheet.create({});
