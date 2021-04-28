import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { todoProps } from '../App'


const TodoList = ({ todos }: { todos: todoProps[] }) => {
  return (
    <View style={styles.todolist} >
      {todos.map(({ id, title, addedTime }) => (
        <View key={id} style={styles.wrapper} >
          <Text style={styles.item}  >{title} </Text>
          <Text style={styles.time}  >{addedTime.toLocaleTimeString()} </Text>
        </View>
      ))}
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({
  todolist: {
    backgroundColor: '#bbb',
    paddingBottom: 100
  },
  wrapper: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,

  },
  item: {
    paddingVertical: 2
  },
  time: {
  }

})
