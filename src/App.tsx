import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import TodoList from './components/TodoList';

export interface todoProps {
  id: number;
  title: string;
  addedTime: Date;
  completed: boolean;
}

const todoData = [
  { id: 1, title: 'Brush teeth', addedTime: new Date(), completed: false },
  { id: 2, title: 'Have food', addedTime: new Date(), completed: false },
  { id: 3, title: 'Take Bath', addedTime: new Date(), completed: false },
];

const App = () => {
  const [todos, setTodos] = useState<todoProps[]>(todoData);
  const [filteredTodos, setFilteredTodos] = useState<todoProps[]>(todoData);

  const handleTodoAdd = (title: string) => {
    const newTodo = {
      title: title,
      id: Math.random(),
      addedTime: new Date(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    Keyboard.dismiss();
  };

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-shadow
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const handleSearch = (searchTerm: string) => {
    setFilteredTodos(
      todos.filter(
        todo =>
          !searchTerm ||
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  return (
    <View style={styles.app}>
      <Header title="My Todo App" />
      <Input placeHolder="Search Todos" icon="S" onSubmit={handleSearch} />
      <TodoList onDelete={handleDelete} todos={filteredTodos} />
      <Input placeHolder="Add Todo" onSubmit={handleTodoAdd} icon="+" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    flex: 1,
  },
});
