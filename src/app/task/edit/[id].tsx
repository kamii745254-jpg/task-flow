
import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import { useTasks } from '@/context/TaskContext';

const categories = ['Work', 'Study', 'Personal'];
const priorities = ['Low', 'Medium', 'High'];

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((item) => item.id === id);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [time, setTime] = useState(task?.time ?? '');
  const [category, setCategory] = useState(task?.category ?? 'Study');
  const [priority, setPriority] = useState(task?.priority ?? 'Medium');

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Task not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a task title.');
      return;
    }

    updateTask(id, {
      title: title.trim(),
      description: description.trim(),
      time: time.trim(),
      category,
      priority,
    });

    Alert.alert('Success', 'Task updated successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back to Details</Text>
      </Pressable>

      <Text style={styles.heading}>Edit Task</Text>
      <Text style={styles.subtitle}>Update your task information.</Text>

      <Text style={styles.label}>TASK TITLE</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={[styles.input, styles.description]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>TIME</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="e.g. 10:00 AM"
      />

      <Text style={styles.label}>CATEGORY</Text>
      <View style={styles.options}>
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.option, category === item && styles.activeOption]}
          >
            <Text style={[styles.optionText, category === item && styles.activeText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>PRIORITY</Text>
      <View style={styles.options}>
        {priorities.map((item) => (
          <Pressable
            key={item}
            onPress={() => setPriority(item)}
            style={[styles.option, priority === item && styles.activeOption]}
          >
            <Text style={[styles.optionText, priority === item && styles.activeText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </Pressable>

      <View style={{ height: 30 }} />
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
  },
  back: {
    color: '#704BE0',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#302941',
  },
  subtitle: {
    color: '#938BA3',
    marginTop: 7,
    marginBottom: 25,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#938BA3',
    marginTop: 18,
    marginBottom: 9,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE4F8',
    borderRadius: 13,
    padding: 15,
    fontSize: 14,
    color: '#302941',
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE4F8',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 17,
  },
  activeOption: {
    backgroundColor: '#704BE0',
    borderColor: '#704BE0',
  },
  optionText: {
    color: '#817991',
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#704BE0',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
