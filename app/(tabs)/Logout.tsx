import { useAuth } from "@/contexts/auth";
import { LogOut } from "lucide-react-native";
import { Pressable, Text } from "react-native";

export default function LogoutButton() {

    const { logout } = useAuth();
    
    return (
        <Pressable
            onPress={logout}
            className="justify-center items-center h-full w-full mt-1 gap-1"
        >
            <LogOut color='#8E8E8F' size={20}/>
            <Text className="text-xs text-[#8E8E8F]">Sair</Text>
        </Pressable>
    );
}