import { useAuth } from "@/src/contexts/auth";
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
	const { user } = useAuth();

	if (user) {
		return <Redirect href="/(tabs)/receitas" />;
	}

	return <Slot />;
}