
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#704BE0',
        tabBarInactiveTintColor: '#A39BB5',
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EEEAF7',
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 23 }}>☷</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Add Task',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 23 }}>＋</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 23 }}>○</Text>
          ),
        }}
      />
    </Tabs>
  );
}
