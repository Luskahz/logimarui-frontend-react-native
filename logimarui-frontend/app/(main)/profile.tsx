import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.text}>Em breve</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#f4a100',
    paddingVertical: 14,
    borderRadius: 6,
  },
  logoutText: {
    color: '#f4a100',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
