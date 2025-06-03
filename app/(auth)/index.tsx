import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function Index() {

	const auth = useAuth()

	const [showPassword, setShowPassword] = useState(false)

	const login = (email: string, password: string) => {
		console.log('signin', { email, password });
		
		fetch('https://683e489b1cd60dca33daeb66.mockapi.io/api/users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(users => {
			if (!users) {
				return;
			}
			const user = users.find((user: any) => user.email === email && user.password === password)
			user ? auth.login(user.email) : console.log('Usuário ou senha inválidos')
		}).catch(error => {
			console.log('Error fetching users:', error);
		})
	}

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
				<Heading className="mt-20" size="3xl">Entrar</Heading>
				{/* <Button onPress={() => login('ruan')} title="ruan"/> */}
				<Formik
					initialValues={{
						email: '',
						password: '',
						confirmPassword: ''
					}}
					validate={values => {

						const errors: {
							email?: string | null;
							password?: string | null;
							confirmPassword?: string | null;
						} = {};

						if (!values.email) {
							errors.email = 'Required';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = 'Endereço de email invalido';
						}

						if(!values.password) {
							errors.password = 'Required';
						} else if (values.password.length < 6) {
							errors.password = 'Deve possuir pelo menos 6 caracteres';
						}
						
						return errors;
					}}
					onSubmit={values => login(values.email, values.password)}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors}) => (
						<Box className="gap-16">
							<Box className="gap-10 mb-6">
							<FormControl
								size="md"
								isInvalid={errors.email ? true : false}
								className="h-24"
							>
								<FormControlLabel>
									<FormControlLabelText>Email</FormControlLabelText>
								</FormControlLabel>
								<Input className="my-1 w-full">
									<InputField
										type="text"
										placeholder="Digite seu email"
										onChangeText={handleChange('email')}
										onBlur={handleBlur('email')}
									/>
								</Input>
								{/* <FormControlHelper>
									<FormControlHelperText>Deve ser um Email válido.</FormControlHelperText>
								</FormControlHelper> */}
								<FormControlError>
									<FormControlErrorIcon as={AlertCircleIcon}/>
									<FormControlErrorText>
										{errors.email}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
							<FormControl
								size="md"
								isInvalid={errors.password ? true : false}
								className="h-24"
							>
								<FormControlLabel>
									<FormControlLabelText>Senha</FormControlLabelText>
								</FormControlLabel>
								<Input className="my-1 w-full">
									<InputField
										type={!showPassword ? "password" : "text"}
										placeholder="Digite sua senha"
										onChangeText={handleChange('password')}
										onBlur={handleBlur('password')}
									/>
									<InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
										<InputIcon as={!showPassword ? EyeOffIcon : EyeIcon}/>
									</InputSlot>
								</Input>
								{/* <FormControlHelper>
									<FormControlHelperText>Deve possuir pelo menos 6 caracteres.</FormControlHelperText>
								</FormControlHelper> */}
								<FormControlError>
									<FormControlErrorIcon as={AlertCircleIcon}/>
									<FormControlErrorText>
										{errors.password}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
						</Box>
						<Box className="w-full gap-4 items-center mb-4">
							<Button onPress={() => {
								console.log('handleSubmit', { values, errors });
								handleSubmit()
							}}
							className="w-full"
							>
								<ButtonText>Confirmar</ButtonText>
							</Button>
							<Link
								href={{
								pathname: '/(auth)/signin'
							}}>
								<Text className="font-semibold">Ainda não tenho conta.</Text>
							</Link>
						</Box>
					</Box>
					)}
				</Formik>
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