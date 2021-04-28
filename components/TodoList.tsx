import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  todos: { id: number, title: string }[]
}

const TodoList = ({ todos }: Props) => {
  return (
    <View style={styles.todolist} >
      {todos.map(todo => (
        <Text key={todo.id} >{todo.title}</Text>
      ))}
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({
  todolist: {
    backgroundColor: 'red'
  }
})
