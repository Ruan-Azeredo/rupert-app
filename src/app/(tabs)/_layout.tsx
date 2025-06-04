
import { useAuth } from "@/src/contexts/auth";
import { Redirect, Tabs } from "expo-router";
import { Bookmark, ChefHat, LogOut } from "lucide-react-native";
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
                        <ChefHat color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favoritas"
                options={{
                    title: "Favoritas",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Bookmark color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Logout"
                options={{
                    title: "Sair",
                    tabBarIcon: ({ focused, color, size }) => (
                        <LogOut color={color} size={size} />
                    ),
                    tabBarButton: () => <LogoutButton />,
                }}
            />
        </Tabs>
    );
}