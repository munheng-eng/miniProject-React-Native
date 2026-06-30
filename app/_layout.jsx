import { Stack } from "expo-router";
import SafeScreen, { ThemeProvider, useScreenTheme } from "../components/SafeScreen";
import { StatusBar } from "react-native";
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

AppRegistry.registerComponent('ReactNativeFirebaseMessagingHeadlessTask', () => 
    async () => console.log('Headless task handled silently.')
);

function LayoutContent() {
  const { statusStyle } = useScreenTheme();

  return (
    <SafeScreen>
      <StatusBar barStyle={statusStyle} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </SafeScreen>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}