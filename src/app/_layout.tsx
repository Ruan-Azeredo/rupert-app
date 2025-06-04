import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/src/contexts/auth";
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