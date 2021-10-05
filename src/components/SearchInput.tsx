import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  handleSearch: (str: string) => void;
}

const SearchInput = ({ handleSearch }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('Coldplay');

  const handleSubmit = () => {
    handleSearch(searchQuery);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        onIconPress={handleSubmit}
      />
    </View>
  );
};

export default SearchInput;
