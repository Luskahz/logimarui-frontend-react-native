import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, marginBottom: 24 }}>
        Home • Break
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/new-replenishment')}
        style={{ backgroundColor: '#000', padding: 16, marginBottom: 12 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Nova Reposição
        </Text>
      </TouchableOpacity>
    </View>
  );
}
