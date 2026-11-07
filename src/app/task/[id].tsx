
import { useLocalSearchParams, router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { useTasks } from '@/context/TaskContext';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks } = useTasks();

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Task not found</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back to Tasks</Text>
      </Pressable>

      <Text style={styles.heading}>Task Details</Text>
      <Text style={styles.subtitle}>View your task information.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>TASK TITLE</Text>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>DESCRIPTION</Text>
        <Text style={styles.value}>
          {task.description || 'No description added.'}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>CATEGORY</Text>
        <Text style={styles.value}>{task.category}</Text>

        <Text style={styles.label}>PRIORITY</Text>
        <Text style={styles.value}>{task.priority}</Text>

        <Text style={styles.label}>TIME</Text>
        <Text style={styles.value}>{task.time}</Text>

        <Text style={styles.label}>STATUS</Text>
        <Text style={styles.value}>
          {task.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/task/edit/${task.id}`)}
      >
        <Text style={styles.buttonText}>✎  Edit Task</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Done</Text>
      </Pressable>
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
  back: {
    color: '#704BE0',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 25,
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
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#938BA3',
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302941',
  },
  value: {
    fontSize: 15,
    color: '#514961',
    lineHeight: 23,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEAF7',
    marginTop: 22,
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#704BE0',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#704BE0',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
