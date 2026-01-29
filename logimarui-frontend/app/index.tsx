import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router, useRootNavigationState } from "expo-router";

export default function Index() {
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    // por enquanto vamos forçar login
    router.replace("/(auth)/login");
  }, [navigationState]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
