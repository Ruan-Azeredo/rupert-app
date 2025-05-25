import { useAuth } from "@/contexts/auth";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
	const { user } = useAuth();

	if (!user) {
		return <Redirect href="/(auth)" />;
	}

	return (

        <Tabs>
            <Tabs.Screen
                name="index"
            />
            <Tabs.Screen
                name="explore"
            />
        </Tabs>
    );
}