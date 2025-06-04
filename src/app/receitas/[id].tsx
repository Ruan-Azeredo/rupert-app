import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { Box } from "@/src/components/ui/box";
import { Heading } from "@/src/components/ui/heading";
import { useAuth } from "@/src/contexts/auth";
import { Link, useLocalSearchParams } from "expo-router";
import { Calendar, Clock, MoveLeft, User } from "lucide-react-native";
import { Image, StyleSheet, Text } from "react-native";

export default function ReceitaDetalhes() {
  const { id } = useLocalSearchParams();

  const { recipes } = useAuth()

  const recipe = recipes.find((recipe) => recipe.id === id);

  function formatDate(isoString: string): string {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // mês começa do zero
        const year = date.getFullYear().toString().slice(-2); // pega os últimos dois dígitos do ano
        return `${day}/${month}/${year}`;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#16a34a', dark: '#16a34a' }}
      headerImage={
        <Image
          source={{ uri: recipe?.image }}
          style={styles.reactLogo}
        />
      }
    >
        <Box className="w-full px-6 justify-between">
            <Link 
                href={{
                    pathname: '/(tabs)/receitas'
                }} 
                className="absolute left-4 w-20 h-10"
            >
                <MoveLeft/>
            </Link>
            <Box className="mb-10">
                <Heading className="w-full text-center" size="lg">{recipe.name}</Heading>
                <Heading className="w-full text-center font-light" size="sm">{recipe.type}</Heading>
            </Box>
            <Box className="flex-row justify-between my-4">
                <Box className="gap-5">
                    <Box className="flex-row items-baseline gap-1">
                        <Text className="text-2xl font-semibold text-green-600">{recipe.nutritional_information.calorias}</Text><Text>Kcal</Text>
                    </Box>
                    <Box className="flex-row items-baseline gap-1">
                        <Text className="text-2xl font-semibold text-green-600">{recipe.nutritional_information.carboidratos}g</Text><Text>Carboidratos</Text>
                    </Box>
                    <Box className="flex-row items-baseline gap-1">
                        <Text className="text-2xl font-semibold text-green-600">{recipe.nutritional_information.gorduras}g</Text><Text>Gorduras</Text>
                    </Box>
                    <Box className="flex-row items-baseline gap-1">
                        <Text className="text-2xl font-semibold text-green-600">{recipe.nutritional_information.proteinas}g</Text><Text>Proteinas</Text>
                    </Box>
                </Box>
                <Box className="gap-7">
                    <Box className="flex-row items-center gap-2">
                        <Text className="text-2xl text-green-600">
                            <Calendar color='#16a34a' size={24}/>
                        </Text><Text>{formatDate(recipe.createdAt)}</Text>
                    </Box>
                    <Box className="flex-row items-center gap-2">
                        <Text className="text-2xl text-green-600">
                            <Clock color='#16a34a' size={24}/>
                        </Text><Text>{recipe.preparation_time} min</Text>
                    </Box>
                    <Box className="flex-row items-center gap-2">
                        <Text className="text-2xl text-green-600">
                            <User color='#16a34a' size={24}/>
                        </Text><Text>{recipe.serve_number}</Text>
                    </Box>
                </Box>
            </Box>
            <Box className="my-4">
                <Heading className="w-full text-green-600 my-5" size="sm">Ingredientes</Heading>
                {recipe.ingredients.map((ingredient, index) => (
                    <Box key={index} className="flex-row justify-between">
                        <Text className="text-center">{ingredient.name}</Text>
                        <Text className="text-center mb-5 text-gray-400">{ingredient.quantity} {ingredient.unit}</Text>
                    </Box>
                ))}
            </Box>
            <Box className="my-4">
                <Heading className="w-full text-green-600 my-5" size="sm">Modo de Preparo</Heading>
                {recipe.preparation_method.map((step, index) => (
                    <Box key={index} className="flex-row justify-between mb-6">
                        <Text className="text-gray-400">{index + 1}. {step}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    </ParallaxScrollView>
  );
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