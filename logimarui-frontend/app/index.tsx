import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          IMARUI EQUIPE DE ENTREGA
        </Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>LOGIN</Text>

        <TextInput
          placeholder="INSIRA SUA MATRÍCULA"
          placeholderTextColor="#999"
          value={cpf}
          onChangeText={setCpf}
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
          <Text style={styles.forgotPassword}>
            Esqueci minha senha
          </Text>
          <Text style={styles.forgotPassword}>
            Registrar
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
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

  header: {
    paddingTop: 60,
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    padding: 25,
    marginBottom: 12,
    color: '#fff',
  },

  forgotPassword: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#f4a100',
    paddingVertical: 14,
    borderRadius: 6,
  },

  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  actionsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 24,
},
});
