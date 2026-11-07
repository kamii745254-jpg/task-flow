
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>
      <Text style={styles.subtitle}>
        Manage your personal information
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </View>

        <Text style={styles.name}>Kamishka</Text>
        <Text style={styles.email}>kamishka@example.com</Text>
        <Text style={styles.member}>TaskFlow Member</Text>
      </View>

      <Text style={styles.sectionTitle}>Account Settings</Text>

      <Pressable style={styles.settingCard}>
        <Text style={styles.settingIcon}>👤</Text>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Personal Information</Text>
          <Text style={styles.settingDescription}>
            Manage your profile details
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.settingCard}>
        <Text style={styles.settingIcon}>🔔</Text>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.settingDescription}>
            Manage task reminders
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.settingCard}>
        <Text style={styles.settingIcon}>⚙️</Text>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Preferences</Text>
          <Text style={styles.settingDescription}>
            Customize your experience
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Text style={styles.footer}>TaskFlow Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    paddingHorizontal: 22,
    paddingTop: 60,
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
    marginBottom: 28,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    padding: 25,
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 28,
    backgroundColor: '#E8DFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#704BE0',
  },
  name: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302941',
    marginTop: 15,
  },
  email: {
    fontSize: 13,
    color: '#938BA3',
    marginTop: 5,
  },
  member: {
    backgroundColor: '#F0EAFF',
    color: '#704BE0',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 14,
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#302941',
    marginTop: 30,
    marginBottom: 14,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEAF7',
  },
  settingIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#302941',
  },
  settingDescription: {
    fontSize: 11,
    color: '#938BA3',
    marginTop: 5,
  },
  arrow: {
    fontSize: 25,
    color: '#A99BC6',
  },
  footer: {
    textAlign: 'center',
    color: '#A39BB5',
    fontSize: 11,
    marginTop: 25,
    marginBottom: 35,
  },
});
