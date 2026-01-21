import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, router, usePathname } from 'expo-router';

export default function MainLayout() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {/* Conteúdo da tela */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.replace('/home')}
        >
          <Text
            style={[
              styles.footerIcon,
              pathname.includes('home') && styles.active,
            ]}
          >
            🏠
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.replace('/profile')}
        >
          <Text
            style={[
              styles.footerIcon,
              pathname.includes('profile') && styles.active,
            ]}
          >
            👤
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1c1c1c',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 22,
    color: '#777',
  },
  active: {
    color: '#f4a100',
  },
});
