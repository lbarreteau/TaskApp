import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Text, Card, IconButton, Searchbar } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Learn React Native', completed: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  // Add a new task to the list
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Toggle the status of a task (completed or not)
  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  // Delete a task from the list
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Sort tasks by status or title
  const sortTasks = (byCompleted) => {
    setTasks([...tasks].sort((a, b) => (byCompleted ? a.completed - b.completed : a.title.localeCompare(b.title))));
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Searchbar
        placeholder="Search tasks"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button mode="contained" onPress={() => navigation.navigate('Task', { addTask })}>
        Add Task
      </Button>
      <Button mode="outlined" onPress={() => sortTasks(true)}>
        Sort by Status
      </Button>
      <Button mode="outlined" onPress={() => sortTasks(false)}>
        Sort by Title
      </Button>
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5 }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    icon={item.completed ? 'undo' : 'check'}
                    size={20}
                    onPress={() => toggleTaskStatus(item.id)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => deleteTask(item.id)}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
