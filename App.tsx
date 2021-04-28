import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import Input from './components/Input'
import TodoList from './components/TodoList'

interface Props {
}
export interface todoProps {
  id: number,
  title: string,
  addedTime: Date
}

const App = (props: Props) => {
  const [todos, setTodos] = useState<todoProps[]>([
    { id: 1, title: 'Brush teeth', addedTime: new Date() },
    { id: 2, title: 'Have food', addedTime: new Date() },
    { id: 3, title: 'Take Bath', addedTime: new Date() },
  ])


  const handleTodoAdd = (todo: todoProps) => {
    setTodos([todo, ...todos])
  }


  return (
    <View style={styles.app} >
      <Header title='My Todo App' />
      <Input placeHolder='Add Todo' onAdd={handleTodoAdd} />
      <TodoList todos={todos} />
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
