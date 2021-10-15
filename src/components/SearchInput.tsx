import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  handleSearch: (str: string) => void;
}

const SearchInput = ({ handleSearch }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = () => {
    searchQuery.length && handleSearch(searchQuery);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Searchbar
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
