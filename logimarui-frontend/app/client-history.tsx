import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function ClientHistory() {
  const { codCliente } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Voltar</Text>
      </Pressable>

      <Text style={styles.title}>HISTÓRICO DO CLIENTE</Text>
      <Text style={styles.text}>Cliente: {String(codCliente || "")}</Text>
      <Text style={styles.text}>Em breve (lista de 10 cards desc)</Text>
    </View>
  );    
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1c1c", padding: 16, paddingTop: 54 },
  back: { color: "#f4a100", marginBottom: 12 },
  title: { color: "#fff", fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  text: { color: "#aaa", textAlign: "center" },
});
