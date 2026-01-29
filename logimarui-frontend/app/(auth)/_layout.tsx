import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Logimarui - v1.0.0</Text>
      </View>
      <View style={styles.content}>
         <Slot />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    paddingTop: 60,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

});
