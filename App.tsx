import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import Input from './components/Input'

interface Props {

}

const App = (props: Props) => {
  return (
    <View style={styles.app} >
      <Header title='My Todo App' />
      <Input placeHolder='Add Todo' />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    flex: 1
  }
})
