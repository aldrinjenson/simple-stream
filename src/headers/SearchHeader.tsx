import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';

const searchHeader = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const searchRef = useRef(null);
  // useEffect(() => {
  //   searchRef?.current?.focus();
  // }, []);
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <TextInput
        style={{ flex: 1 }}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Search music"
        // ref={searchRef}
        autoFocus={true}
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
