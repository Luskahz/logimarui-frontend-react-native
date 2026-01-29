import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TicketScreen() {
  return (
    <View style={styles.container}>
      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.backButton} onPress={() => router.back()}>
            Voltar
          </Text>
        </View>

        <Text style={styles.title}>TICKET DE REPOSIÇÃO</Text>

        {/* Status */}
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>
            AGUARDANDO VALIDAÇÃO DO MONITORAMENTO
          </Text>
        </View>

        {/* Cliente */}
        <View style={styles.block}>
          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.text}>102030 • Bar do Zé</Text>
        </View>

        {/* Motorista */}
        <View style={styles.block}>
          <Text style={styles.label}>Motorista</Text>
          <Text style={styles.text}>Carlos Silva</Text>
        </View>

        {/* Veículo */}
        <View style={styles.blockRow}>
          <View style={styles.blockHalf}>
            <Text style={styles.label}>Veículo</Text>
            <Text style={styles.text}>V12</Text>
          </View>

          <View style={styles.blockHalf}>
            <Text style={styles.label}>Placa</Text>
            <Text style={styles.text}>ABC1D23</Text>
          </View>

          <View style={styles.blockHalf}>
            <Text style={styles.label}>Mapa</Text>
            <Text style={styles.text}>Rota 07</Text>
          </View>
        </View>

        {/* Produtos */}
        <Text style={styles.sectionTitle}>Produtos</Text>

        <View style={styles.productRow}>
          <Text style={styles.productText}>789123 • Pilsen 600ml</Text>
          <Text style={styles.productText}>3 UN</Text>
          <Text style={styles.productText}>Avaria</Text>
        </View>

        <View style={styles.productRow}>
          <Text style={styles.productText}>789456 • Refrigerante 2L</Text>
          <Text style={styles.productText}>1 UN</Text>
          <Text style={styles.productText}>Falta</Text>
        </View>

        <View style={styles.productRow}>
          <Text style={styles.productText}>789789 • Água 510ml</Text>
          <Text style={styles.productText}>6 UN</Text>
          <Text style={styles.productText}>Troca</Text>
        </View>

        {/* Fotos */}
        <View style={styles.imagesRow}>
          <View style={styles.imageBox}>
            <Text style={styles.imageText}>Foto Produto</Text>
          </View>

          <View style={styles.imageBox}>
            <Text style={styles.imageText}>Foto Caminhão</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>COMPARTILHAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 6,
  },
  backButton: {
    color: "#f4a100",
    fontSize: 14,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  statusBox: {
    backgroundColor: "#262626",
    borderLeftWidth: 4,
    borderLeftColor: "#f4a100",
    padding: 8,
    marginBottom: 10,
  },
  statusText: {
    color: "#f4a100",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  block: {
    marginBottom: 6,
  },
  blockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  blockHalf: {
    flex: 1,
    marginRight: 6,
  },
  label: {
    color: "#f4a100",
    fontSize: 12,
    fontWeight: "bold",
  },
  text: {
    color: "#ccc",
    fontSize: 13,
  },
  sectionTitle: {
    color: "#f4a100",
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 4,
  },
  productRow: {
    backgroundColor: "#262626",
    padding: 6,
    borderRadius: 4,
    marginBottom: 4,
  },
  productText: {
    color: "#ccc",
    fontSize: 12,
  },
  imagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  imageBox: {
    flex: 1,
    height: 80,
    backgroundColor: "#262626",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  imageText: {
    color: "#777",
    fontSize: 12,
  },
  footer: {
    paddingTop: 8,
  },
  shareButton: {
    backgroundColor: "#f4a100",
    paddingVertical: 12,
    borderRadius: 6,
  },
  shareText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
