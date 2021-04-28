import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { todoProps } from '../App'
import AddButton from './AddButton'

interface Props {
  placeHolder: string,
  onAdd: ({ }: todoProps) => void
}

const Input = (props: Props) => {
  const [searchVal, setSearchVal] = useState<string>("")
  const handleAdd = () => {
    props.onAdd({ title: searchVal, id: Math.random(), addedTime: new Date() })
  }
  return (
    <View style={styles.wrapper} >
      <TextInput style={styles.input} placeholderTextColor='#666' placeholder={props.placeHolder} onChangeText={val => setSearchVal(val)} value={searchVal} />
      <AddButton onPress={handleAdd} />
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
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: 'black',
    paddingLeft: 20
  }
})
