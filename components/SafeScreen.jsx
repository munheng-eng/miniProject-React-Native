import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/color";

const ScreenThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState(COLORS.background);
  const [statusStyle, setStatusStyle] = useState("dark-content");

  return (
    <ScreenThemeContext.Provider value={{ bgColor, setBgColor, statusStyle, setStatusStyle }}>
      {children}
    </ScreenThemeContext.Provider>
  );
};

export const useScreenTheme = () => useContext(ScreenThemeContext);

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { bgColor } = useScreenTheme();

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: bgColor }}>
      {children}
    </View>
  );
};

export default SafeScreen;