
import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { router } from 'expo-router';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  TextInput,
} from 'react-native';

const categories = ['All', 'Work', 'Study', 'Personal'];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { tasks, toggleTask } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory === 'All' || task.category === selectedCategory;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? completedTasks / tasks.length : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6FF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>TaskFlow</Text>
            <Text style={styles.tagline}>YOUR DAY, ORGANIZED.</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>K</Text>
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.date}>MONDAY, TODAY</Text>
          <Text style={styles.heading}>Good morning! 👋</Text>
          <Text style={styles.subtitle}>
            Let's make today productive.
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressLabel}>DAILY PROGRESS</Text>
              <Text style={styles.progressTitle}>Keep it up!</Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` },
              ]}
            />
          </View>

          <Text style={styles.progressInfo}>
            {completedTasks} of {tasks.length} tasks completed
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search your tasks..."
            placeholderTextColor="#A29AAF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryList}>
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.taskCount}>
            {filteredTasks.length} tasks
          </Text>
        </View>

        {filteredTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Pressable
              onPress={() => toggleTask(task.id)}
              style={styles.checkboxButton}
            >
              <View
                style={[
                  styles.checkCircle,
                  task.completed && styles.checkedCircle,
                ]}
              >
                {task.completed && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push(`/task/${task.id}`)}
              style={styles.taskContent}
            >
              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.completedTask,
                ]}
              >
                {task.title}
              </Text>

              <Text style={styles.taskMeta}>
                {task.time} • {task.category}
              </Text>

              <Text style={styles.openDetails}>
                View Details →
              </Text>
            </Pressable>

            <Text style={styles.moreIcon}>•••</Text>
          </View>
        ))}

        {filteredTasks.length === 0 && (
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'No matching tasks found.'
              : 'No tasks in this category.'}
          </Text>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    paddingHorizontal: 22,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 27,
    fontWeight: '800',
    color: '#6845D9',
  },
  tagline: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#9990AD',
    marginTop: 3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#E8DFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#6845D9',
    fontSize: 19,
    fontWeight: 'bold',
  },
  greeting: {
    marginTop: 35,
    marginBottom: 22,
  },
  date: {
    fontSize: 11,
    fontWeight: '700',
    color: '#978BAF',
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: 27,
    fontWeight: '800',
    color: '#29223D',
    marginTop: 9,
  },
  subtitle: {
    fontSize: 14,
    color: '#8B849B',
    marginTop: 6,
  },
  progressCard: {
    backgroundColor: '#704BE0',
    borderRadius: 22,
    padding: 20,
    marginBottom: 25,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 10,
    color: '#DED4FF',
    fontWeight: '700',
    letterSpacing: 1.3,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    marginTop: 7,
  },
  progressCircle: {
    width: 57,
    height: 57,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: '#C7B5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  progressBar: {
    height: 7,
    backgroundColor: '#9275EA',
    borderRadius: 10,
    marginTop: 19,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  progressInfo: {
    color: '#E5DEFF',
    fontSize: 12,
    marginTop: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  searchIcon: {
    fontSize: 25,
    color: '#704BE0',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#342D43',
  },
  clearSearch: {
    fontSize: 17,
    color: '#704BE0',
    padding: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#302941',
  },
  categoryList: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 28,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE4F8',
  },
  categoryActive: {
    backgroundColor: '#704BE0',
    borderColor: '#704BE0',
  },
  categoryText: {
    color: '#817991',
    fontWeight: '600',
    fontSize: 13,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  taskCount: {
    color: '#978BAF',
    fontSize: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  checkboxButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#704BE0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCircle: {
    backgroundColor: '#704BE0',
    borderColor: '#704BE0',
  },
  checkMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  taskContent: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 4,
  },
  taskTitle: {
    color: '#342D43',
    fontSize: 13,
    fontWeight: '700',
  },
  completedTask: {
    color: '#AAA4B5',
    textDecorationLine: 'line-through',
  },
  taskMeta: {
    color: '#A29AAF',
    fontSize: 11,
    marginTop: 6,
  },
  openDetails: {
    color: '#704BE0',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
  },
  moreIcon: {
    color: '#A69ABF',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  emptyText: {
    color: '#91889F',
    textAlign: 'center',
    padding: 20,
  },
  bottomSpace: {
    height: 30,
  },
});
