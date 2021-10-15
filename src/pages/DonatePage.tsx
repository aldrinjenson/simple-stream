import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

const DonatePage = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Headline>Donate Page</Headline>
      <Text>Think this app is any good?</Text>
      <Button
        style={{ marginTop: 20 }}
        onPress={() =>
          Linking.openURL('https://github.com/aldrinjenson/simple-stream')
        }>
        Visit project
      </Button>
    </View>
  );
};

export default DonatePage;

const styles = StyleSheet.create({});
