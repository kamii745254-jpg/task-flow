
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import { useTasks } from '@/context/TaskContext';

const categories = ['Work', 'Study', 'Personal'];
const priorities = ['Low', 'Medium', 'High'];

export default function AddTaskScreen() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Study');
  const [priority, setPriority] = useState('Medium');
  const [time, setTime] = useState('10:00 AM');

  function handleAddTask() {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a task title.');
      return;
    }

    addTask({
      title: title.trim(),
      description,
      category,
      priority,
      time,
    });

    Alert.alert('Success', 'Your task has been added!');

    setTitle('');
    setDescription('');
    setCategory('Study');
    setPriority('Medium');
    setTime('10:00 AM');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Add New Task</Text>
      <Text style={styles.subtitle}>
        Create a task and stay organized.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Task Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          placeholderTextColor="#A39BB5"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add task details..."
          placeholderTextColor="#A39BB5"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.options}>
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.option,
                category === item && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  category === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.options}>
          {priorities.map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              style={[
                styles.option,
                priority === item && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  priority === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="e.g. 10:00 AM"
          placeholderTextColor="#A39BB5"
        />

        <Pressable
          style={styles.addButton}
          onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>
            ＋ Create Task
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
  },
  content: {
    padding: 22,
    paddingTop: 55,
    paddingBottom: 35,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#302941',
  },
  subtitle: {
    fontSize: 14,
    color: '#938BA3',
    marginTop: 7,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#302941',
    marginBottom: 9,
    marginTop: 17,
  },
  input: {
    backgroundColor: '#FAF9FD',
    borderWidth: 1,
    borderColor: '#EEEAF7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#302941',
  },
  textArea: {
    height: 95,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  option: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F2FA',
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  selectedOption: {
    backgroundColor: '#704BE0',
    borderColor: '#704BE0',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#827991',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#704BE0',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 28,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
