import { useAuth } from "@/contexts/auth";
import { Button, Text, View } from "react-native";

export default function Favoritas() {

	const {logout} = useAuth()

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>I'm in tab explore</Text>
			<Button onPress={() => logout()} title="sair"/>
		</View>
	);
}
