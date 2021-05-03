import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={query => setSearchQuery(query)}
      value={searchQuery}
    />
  );
};

export default SearchBar;
