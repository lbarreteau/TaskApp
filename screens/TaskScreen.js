import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function TaskScreen({ route, navigation }) {
  const { addTask } = route.params;  // Récupérer la fonction 'addTask' des paramètres
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState('');

  const handleSaveTask = () => {
    if (taskTitle.trim() === '') {
      setError('Please enter a task!');
      return;
    }
    // Create a new task object with a unique ID
    const newTask = { id: Date.now().toString(), title: taskTitle, completed: false };
    addTask(newTask);
    navigation.goBack(); // Go back to the previous screen after adding the task
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
        error={!!error}
        style={{ marginBottom: 10 }}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSaveTask}>
        Save Task
      </Button>
    </View>
  );
}
