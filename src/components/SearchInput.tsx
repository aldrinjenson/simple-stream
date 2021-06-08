import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  handleSearch: (str: string) => void;
}

const SearchInput = ({ handleSearch }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = () => {
    handleSearch(searchQuery);
    setSearchQuery('');
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