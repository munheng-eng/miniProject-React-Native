import { Stack } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return <SafeScreen>
    <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
  </SafeScreen>;
}