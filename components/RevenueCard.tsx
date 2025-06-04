
import { useAuth } from "@/contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Bookmark } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, Text } from "react-native";
import { Box } from "./ui/box";

type Revnue = {
    createdAt: string; // ISO date string
    name: string;
    ingredients: {name: string, quantity: number, unit: string}[]; // Can be refined if structure is known
    nutritional_information: Record<string, unknown>; // Can be refined as well
    preparation_time: number;
    serve_number: number;
    preparation_method: string[]; // Assuming it's an array of step descriptions
    type: string;
    image: string; // Assuming image is a string URL
    id: string;
};

export default function RevenueCard({
    createdAt,
    name,
    ingredients,
    nutritional_information,
    preparation_time,
    serve_number,
    preparation_method,
    type,
    image,
    id,
}: Revnue) {
    const { user } = useAuth();
    const navigation = useNavigation();

	const [fav, setFav] = useState(false)

	/* const toggleFav = () => {

	} */

    useEffect(() => {
        if (!user) {
            return;
        }

        if (user?.favorites_revenues_id?.includes(parseInt(id))) {
			console.log('set fav');
            setFav(true);
        }

    }, [user, id])

    return (
        <Pressable className="bg-white rounded-lg shadow-sm shadow-slate-200"
            onPress={() => {
                router.push({
                pathname: "/receitas/[id]",
                params: {
                    id, // será acessível na tela de detalhes
                    // Você pode passar outros dados via context ou global store se quiser
                },
                });
            }}
        >
            <Image
              className="w-full h-32 rounded-t-lg"
              source={{ uri: image}}
            />
            <Box className="flex-row p-4">
                <Box className="w-full flex-1">
					<Text className="font-bold text-lg">{name}</Text>
					<Box className="flex-row">
                        <Text className="text-xs text-gray-400">{ingredients[0]?.name + ' ,' + ingredients[1]?.name  + ' ,' +  ingredients[2]?.name + '...'}</Text>
					</Box>
                </Box>
                <Box className="items-end gap-1">
					{fav ? <Bookmark size={20} color='#16a34a' fill='#16a34a'/> : <Bookmark size={20} color='#16a34a' fill='transparent'/>}
					<Text className="text-sm text-gray-900">{preparation_time} min</Text>
                </Box>
            </Box>

        </Pressable>
    )
}