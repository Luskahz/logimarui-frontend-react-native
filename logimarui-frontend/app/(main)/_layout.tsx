import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, router, usePathname } from 'expo-router';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { ProfileIcon } from '@/components/icons/ProfileIcon';

export default function MainLayout() {
  const pathname = usePathname();

  const isHomeActive = pathname === '/home';
  const isProfileActive = pathname === '/profile';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push('/home')}
        >
          <HomeIcon
            color={isHomeActive ? '#f4a100' : '#777'}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push('/profile')}
        >
          <ProfileIcon
            color={isProfileActive ? '#f4a100' : '#777'}
            size={24}
          />
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
});
