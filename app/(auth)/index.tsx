import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: '#fff',
			}}
		>
			<Text>entre</Text>
			<Link href={{
				pathname: '/(auth)/signin'
				
			}}>Ainda não tem conta? cadastre-se</Link>
		</View>
	)
}
