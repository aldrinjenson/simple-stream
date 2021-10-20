import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  handleSearch: (str: string) => void;
}

const SearchInput = ({ handleSearch }: Props) => {
  // const [searchQuery, setSearchQuery] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('Coldplay');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    searchQuery.length && handleSearch(searchQuery);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Searchbar
        ref={inputRef}
        placeholder="try 'Imagine Dragons'"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        onIconPress={handleSubmit}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

export default SearchInput;
