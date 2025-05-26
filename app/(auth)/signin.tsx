import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";

export default function Singin() {

	const {login} = useAuth()

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/bg-foods.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<Box className="w-full h-[560px] px-6 justify-between">
				<Link
					href={{
					pathname: '/(auth)'
				}}>
					<Box className="w-fit flex-row gap-2">
						<MoveLeft className=""/>
						<Text className="mt-1">Voltar</Text>
					</Box>
				</Link>
				<Heading size="3xl">Registre-se</Heading>
				{/* <Button onPress={() => login('ruan')} title="ruan"/> */}
				<Box className="gap-8">
					<FormControl
						size="md"
					>
						<FormControlLabel>
							<FormControlLabelText>Email</FormControlLabelText>
						</FormControlLabel>
						<Input className="my-1 w-full">
							<InputField
								type="text"
								placeholder="Digite seu email"
							/>
						</Input>
						<FormControlHelper>
							<FormControlHelperText>Deve ser um Email válido.</FormControlHelperText>
						</FormControlHelper>
						<FormControlError>
							<FormControlErrorIcon />
							<FormControlErrorText />
						</FormControlError>
					</FormControl>
					<FormControl
						size="md"
					>
						<FormControlLabel>
							<FormControlLabelText>Senha</FormControlLabelText>
						</FormControlLabel>
						<Input className="my-1 w-full">
							<InputField
								type={true ? "password" : "text"}
								placeholder="Digite sua senha"
							/>
							<InputSlot className="pr-3">
								<InputIcon as={true ? EyeOffIcon : EyeIcon}/>
							</InputSlot>
						</Input>
						<FormControlHelper>
							<FormControlHelperText>Deve possuir pelo menos 6 caracteres.</FormControlHelperText>
						</FormControlHelper>
						<FormControlError>
							<FormControlErrorIcon />
							<FormControlErrorText />
						</FormControlError>
					</FormControl>
					<FormControl
						size="md"
					>
						<FormControlLabel>
							<FormControlLabelText>Confirme a Senha</FormControlLabelText>
						</FormControlLabel>
						<Input className="my-1 w-full">
							<InputField
								type={true ? "password" : "text"}
								placeholder="Confirme sua senha"
							/>
							<InputSlot className="pr-3">
								<InputIcon as={true ? EyeOffIcon : EyeIcon}/>
							</InputSlot>
						</Input>
						<FormControlHelper>
							<FormControlHelperText>Deve ser igual a digitada anteriormente.</FormControlHelperText>
						</FormControlHelper>
						<FormControlError>
							<FormControlErrorIcon />
							<FormControlErrorText />
						</FormControlError>
					</FormControl>
				</Box>
				<Button>
					<ButtonText>Confirmar</ButtonText>
				</Button>
			</Box>
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	reactLogo: {
		height: '100%',
		width:'100%',
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
  });