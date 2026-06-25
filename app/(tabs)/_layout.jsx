import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/color";

const TabsLayout = () => {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderTopColor: COLORS.border,
                    borderTopWidth: 1,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 80,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    title: "Expenses",
                    tabBarIcon: ({ color, size }) => <Ionicons name="cash-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="place"
                options={{
                    title: "Place",
                    tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="qrScan"
                options={{
                    title: "Scan Me",
                    tabBarIcon: ({ color, size }) => <Ionicons name="qr-code-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
};
export default TabsLayout;
