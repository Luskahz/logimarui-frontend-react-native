import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function LoginScreen() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (!matricula || !senha) {
      alert("Preencha matricula e senha");
      return;
    }
    // aqui fica a logica do login de fato, onde eu faço o fetch na url da api

    router.replace("/(main)/home");
  }

  return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Text style={styles.title}>
          BEM VINDO
        </Text>
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
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            Recuperar Senha
          </Text>

          <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
            Registrar
          </Text>
          
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            ENTRAR
          </Text>
        </TouchableOpacity>
      </View>
  );

}
const styles = StyleSheet.create({


  header: {
    paddingTop: 60,
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 1,
  },
  link: {
    color: "#aaa",
    fontSize: 12,
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

  forgotPassword: {
    color: "#aaa",
    fontSize: 15,
    marginBottom: 13,
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
