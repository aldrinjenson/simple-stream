import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { todoProps } from '../App';
import CustomButton from './CustomButton';

const styles = StyleSheet.create({
  todolist: {
    backgroundColor: '#bbb',
    height: 400,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  textWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
    // backgroundColor: 'blue',
  },
  item: {
    paddingVertical: 2,
  },
  time: {},
});

const TodoList = ({
  todos,
  onDelete,
}: {
  todos: todoProps[];
  onDelete: (id: number) => void;
}) => {
  return (
    <View style={styles.todolist}>
      <ScrollView>
        {todos.map(({ id, title, addedTime }) => (
          <View key={id} style={styles.wrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.item}>{title} </Text>
              <Text style={styles.time}>
                {addedTime.toLocaleTimeString('default', {
                  hour12: true,
                })}
              </Text>
            </View>
            <CustomButton onPress={() => onDelete(id)} icon="-" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoList;
