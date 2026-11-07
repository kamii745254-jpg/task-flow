
import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
} from 'expo-router/ui';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />

      <TabList style={styles.tabList}>
        <TabTrigger name="home" href="/" asChild>
          <TabButton label="Tasks" symbol="☷" />
        </TabTrigger>

        <TabTrigger name="explore" href="/explore" asChild>
          <TabButton label="Add Task" symbol="＋" />
        </TabTrigger>

        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton label="Profile" symbol="○" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  label,
  symbol,
  isFocused,
  ...props
}: {
  label: string;
  symbol: string;
  isFocused?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable {...props} style={styles.tabButton}>
      <Text style={[styles.icon, isFocused && styles.active]}>
        {symbol}
      </Text>
      <Text style={[styles.label, isFocused && styles.active]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabList: {
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEAF7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: '100%',
  },
  icon: {
    fontSize: 22,
    color: '#A39BB5',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A39BB5',
  },
  active: {
    color: '#704BE0',
  },
});
