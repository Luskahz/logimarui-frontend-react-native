import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

type Reposicao = {
  id: string;
  codCliente: string;
  nomeCliente: string;
  data: string;
  motivoReposicao: string;
  codProduto: string;
  nomeProduto: string;
  quantidade: number;
  unidade: string;
  codVeiculo: string;
  placa: string;
  mapaRota: string;
};

const MOCK_REPOSICOES: Reposicao[] = [
  {
    id: "1",
    codCliente: "102030",
    nomeCliente: "Bar do Zé",
    data: "15/01/2026",
    motivoReposicao: "Avaria",
    codProduto: "789123",
    nomeProduto: "Cerveja Pilsen 600ml",
    quantidade: 3,
    unidade: "UN",
    codVeiculo: "V12",
    placa: "ABC1D23",
    mapaRota: "Rota 07",
  },
  {
    id: "2",
    codCliente: "405060",
    nomeCliente: "Mercado Central",
    data: "14/01/2026",
    motivoReposicao: "Falta",
    codProduto: "789456",
    nomeProduto: "Refrigerante Cola 2L",
    quantidade: 1,
    unidade: "CX",
    codVeiculo: "V09",
    placa: "XYZ9K88",
    mapaRota: "Rota 03",
  },
];
export default function ReplenishmentsScreen() {
  function renderItem({ item }: { item: Reposicao }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/(main)/ticket",
            params: {
              id: item.id,
            },
          })
        }
      >
        <Text style={styles.cardTitle}>
          {item.codCliente} - {item.nomeCliente} • {item.data}
        </Text>

        <Text style={styles.cardLine}>
          {item.motivoReposicao} - {item.codProduto} - {item.nomeProduto}
        </Text>

        <Text style={styles.cardLine}>
          {item.quantidade} {item.unidade}
        </Text>

        <Text style={styles.cardFooter}>
          Veículo {item.codVeiculo} • {item.placa} • {item.mapaRota}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>REPOSIÇÕES REALIZADAS</Text>

      {/* Botão Nova Reposição */}
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => router.push("/new-replenishment")}
      >
      <Text style={styles.newButtonText}>NOVA REPOSIÇÃO</Text>
      </TouchableOpacity>

      {/* Lista */}
      <FlatList
        data={MOCK_REPOSICOES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 24,
    marginBottom: 16,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  newButton: {
    backgroundColor: "#f4a100",
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: 16,
  },

  newButtonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  list: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#262626",
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
  },

  cardLine: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 4,
  },

  cardFooter: {
    color: "#888",
    fontSize: 12,
    marginTop: 6,
  },
});
