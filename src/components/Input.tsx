import React, { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import CustomButton from './CustomButton';

interface Props {
  placeHolder: string;
  onSubmit: (val: string) => void;
  icon: string;
}

const Input = ({ placeHolder, onSubmit, icon }: Props) => {
  const [val, setVal] = useState<string>('');
  const handleAdd = () => {
    // if (val) {
    onSubmit(val);
    // setVal('');
    // Keyboard.dismiss();
    // }
  };
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#666"
        placeholder={placeHolder}
        onChangeText={val => setVal(val)}
        value={val}
        onSubmitEditing={handleAdd}
      />
      <CustomButton onPress={handleAdd} icon={icon} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ddd',
    borderColor: 'grey',
    borderWidth: 2,
    margin: 50,
    borderRadius: 50,
    color: 'black',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: 'black',
    paddingLeft: 20,
  },
});
