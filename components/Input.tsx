import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface Props {
  placeHolder: string
}

const Input = (props: Props) => {
  const [searchVal, setSearchVal] = useState<string>("")
  return (
    <View style={styles.wrapper} >
      <TextInput style={styles.input} placeholderTextColor='#666' placeholder={props.placeHolder} onChangeText={val => setSearchVal(val)} value={searchVal} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ddd',
    borderColor: 'grey',
    borderWidth: 2,
    margin: 50,
    borderRadius: 50,
    color: 'black',
  },
  input: {
    color: 'black',
    paddingHorizontal: 20
  }
})
