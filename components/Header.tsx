import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  title: string
}

const Header = (props: Props) => {
  return (
    <View style={styles.header} >
      <Text style={styles.title} >{props.title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#bbb',
    height: '10%',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
  }
})
