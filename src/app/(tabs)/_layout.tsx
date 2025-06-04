
import { useAuth } from "@/src/contexts/auth";
import { Redirect, Tabs } from "expo-router";
import { Bookmark, ChefHat, LogOut } from "lucide-react-native";
import { Text } from "react-native";
import LogoutButton from "./Logout";


export default function TabsLayout() {
    const { user } = useAuth();

	if (!user) {
        return <Redirect href="/(auth)" />;
	}

	return (
        <Tabs>
        <Tabs.Screen
          name="receitas"
          options={{
            title: "Receitas",
            tabBarIcon: ({ focused, color, size }) => (
              <ChefHat color={focused ? '#16a34a' : '#8E8E8F'} size={size} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#16a34a' : '#8E8E8F', fontSize: 10 }}>
                Receitas
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="favoritas"
          options={{
            title: "Favoritas",
            tabBarIcon: ({ focused, color, size }) => (
              <Bookmark color={focused ? '#16a34a' : '#8E8E8F'} size={size} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#16a34a' : '#8E8E8F', fontSize: 10 }}>
                Favoritas
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Logout"
          options={{
            title: "Sair",
            tabBarIcon: ({ focused, color, size }) => (
              <LogOut color={focused ? '#16a34a' : '#8E8E8F'} size={size} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#16a34a' : '#8E8E8F', fontSize: 10 }}>
                Sair
              </Text>
            ),
            tabBarButton: () => <LogoutButton />,
          }}
        />
      </Tabs>
    );
}