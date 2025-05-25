import { useAuth } from "@/contexts/auth";
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Singin() {

	const {login} = useAuth()

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>registre-se</Text>
			<Link href={{
				pathname: '/(auth)'
				
			}}>Já tenho conta</Link>
			<Button onPress={() => login('ruan')} title="ruan"/>
		</View>
	)
}
