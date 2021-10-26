import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Headline, Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/customReduxHooks';
import { updateTheme } from '../redux/actions/settingsActions';
import darkTheme from '../themes/dark';
import light from '../themes/light';

const SettingsPage = () => {
  const [themeDropDownVisible, setThemeDropDownVisible] = useState(false);
  const theme = useAppSelector(state => state.settingsReducer.theme);
  const dispatch = useDispatch();

  const handlePress = () => {
    if (theme.name === 'dark') {
      dispatch(updateTheme(light));
    } else {
      dispatch(updateTheme(darkTheme));
    }
  };
  return (
    <View style={{ position: 'relative' }}>
      <Headline>Settings</Headline>
      <Button onPress={handlePress}>Toggle theme</Button>

      <Menu
        visible={themeDropDownVisible}
        onDismiss={() => setThemeDropDownVisible(false)}
        style={{ position: 'absolute', right: 10, left: '50%' }}
        anchor={
          <Button
            style={{ alignItems: 'flex-start' }}
            onPress={() => setThemeDropDownVisible(true)}>
            Theme
          </Button>
        }>
        <Menu.Item onPress={() => {}} title={theme.name} />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
};

export default SettingsPage;
