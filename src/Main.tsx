import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './AppNavigator';
import { useAppSelector } from './hooks/customReduxHooks';

interface Props {}

const Main = (props: Props) => {
  const theme = useAppSelector(state => state.settingsReducer.theme);
  const isTourComplete = useAppSelector(
    state => state.settingsReducer.isTourComplete,
  );
  return (
    <PaperProvider theme={theme}>
      {isTourComplete ? (
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
      ) : null}
    </PaperProvider>
  );
};

export default Main;
