import { Stack } from 'expo-router';
import { TaskProvider } from '@/context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" />
        <Stack.Screen name="task/[id]" />
        <Stack.Screen name="task/edit/[id]" />
      </Stack>
    </TaskProvider>
  );
}