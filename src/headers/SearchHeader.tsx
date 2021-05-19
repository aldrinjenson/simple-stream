import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';

const searchHeader = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <TextInput
        style={{ flex: 1 }}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Search music"
      />
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          console.log(searchQuery);
        }}
      />
    </Appbar.Header>
  );
};

export default searchHeader;
