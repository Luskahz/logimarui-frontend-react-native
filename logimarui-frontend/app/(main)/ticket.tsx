import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

export default function TicketScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={() => router.back()}>
          Voltar
        </Text>
      </View>
      <Text style={styles.title}>TICKET DE REPOSIÇÃO</Text>

      <Text style={styles.section}>Cliente</Text>
      <Text style={styles.text}>102030 - Bar do Zé</Text>

      <Text style={styles.section}>Produto</Text>
      <Text style={styles.text}>789123 - Cerveja Pilsen 600ml</Text>
      <Text style={styles.text}>Quantidade: 3 UN</Text>
      <Text style={styles.text}>Motivo: Avaria</Text>

      <Text style={styles.section}>Veículo</Text>
      <Text style={styles.text}>V12 - ABC1D23</Text>
      <Text style={styles.text}>Mapa: Rota 07</Text>

      <Text style={styles.section}>Motorista</Text>
      <Text style={styles.text}>Carlos Silva • Matrícula 123</Text>

      {/* Fotos virão aqui */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Foto do Produto</Text>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Foto do Caminhão</Text>
      </View>

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>COMPARTILHAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  header: {
    marginBottom: 12
  },

  backButton: {
    color: "#f4a100",
    fontSize: 14,
  },
  section: {
    color: "#f4a100",
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },
  text: {
    color: "#ccc",
    marginBottom: 4,
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: "#262626",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  imageText: {
    color: "#777",
  },
  shareButton: {
    backgroundColor: "#f4a100",
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 24,
    marginBottom: 40,
  },
  shareText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
