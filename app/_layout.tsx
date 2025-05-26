import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/contexts/auth";
import "@/global.css";
import { Slot } from "expo-router";
import React from "react";

export default function RootLayout() {
	return (
        <GluestackUIProvider mode="light">
			<AuthProvider>
                <Slot />
            </AuthProvider>
		</GluestackUIProvider>
    );
}