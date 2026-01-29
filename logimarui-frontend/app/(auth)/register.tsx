import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");


  function handleRegister() {
    if (!nome || !matricula || !senha) {
      alert("Preencha todos os campos");
      return;
    }
    router.replace("/(main)/home");
  }

  return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Text style={styles.title}>
          REGISTRAR
        </Text>
          <TextInput
            placeholder="INSIRA O NOME DE USUÁRIO"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />

        <TextInput
          placeholder="INSIRA SUA MATRÍCULA"
          placeholderTextColor="#999"
          value={matricula}
          onChangeText={setMatricula}
          style={styles.input}
        />

        <TextInput
          placeholder="INSIRA SUA SENHA"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />

        <View style={styles.actionsRow}>
            <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
              Entrar
            </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>
            REGISTRAR
          </Text>
        </TouchableOpacity>
      </View>
  );

}
const styles = StyleSheet.create({
  link: {
    color: "#aaa",
    fontSize: 14
  },

  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    fontSize: 14,
    padding: 25,
    marginBottom: 12,
    color: "#fff",
  },

  button: {
    backgroundColor: "#f4a100",
    paddingVertical: 14,
    borderRadius: 6,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
});
