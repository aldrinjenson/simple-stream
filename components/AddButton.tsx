import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  onPress: () => void
}

const AddButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.wrapper} >
      <Text style={{ fontSize: 20 }} >+</Text>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    marginRight: 30
  },

})
