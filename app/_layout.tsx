import { AuthProvider } from "@/contexts/auth";
import { Slot } from "expo-router";
import React from "react";

export default function RootLayout() {
	return (
		<AuthProvider>
			<Slot />
		</AuthProvider>
	);
}