import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function ForgotPAsswordScreen() {
  const [matricula, setMatricula] = useState("");

  function handleForgotPassword() {
    if (!matricula) {
      alert("Preencha a matrícula");
      return;
    }
    router.replace("/(main)/home");
  }

  return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Text style={styles.title}>
          RECUPERAÇÃO DE SENHA
        </Text>

        <TextInput
          placeholder="INSIRA SUA MATRÍCULA"
          placeholderTextColor="#999"
          value={matricula}
          onChangeText={setMatricula}
          style={styles.input}
        />

        <View style={styles.actionsRow}>
            <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
              Entrar
            </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>
            ENVIAR SOLICITAÇÃO
          </Text>
        </TouchableOpacity>
      </View>
  );

}
const styles = StyleSheet.create({
 
  link: {
    color: "#aaa",
    fontSize: 12,
  },
  title: {
    color: "#fff",
    fontSize: 35,
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
    fontSize: 20,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
});
