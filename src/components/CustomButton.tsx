import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  icon: string;
}

const CustomButton = ({ icon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={{ fontSize: 20 }}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    marginRight: 30,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#777',
  },
});
