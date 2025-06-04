import RevenueCard from "@/components/RevenueCard";
import { Box } from "@/components/ui/box";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { PlusCircleIcon, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

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


export default function Favoritas() {

    const { setRecipes, recipes, user } = useAuth();

    const [revenues, setRevenues] = useState<Revnue[]>([]);

    useEffect(() => {
        if(recipes.length > 0) {
            setRevenues(recipes.filter(item => user?.favorites_revenues_id?.includes(parseInt(item.id))));
            setFilteredRevenues(recipes.filter(item => user?.favorites_revenues_id?.includes(parseInt(item.id))));
            return;
        } else {
            fetch('https://683e489b1cd60dca33daeb66.mockapi.io/api/revenues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then((rev: Revnue[]) => {
                if (!rev) {
                    return;
                }
                console.log('revenues fetched');
                setRevenues(rev.filter(item => user?.favorites_revenues_id?.includes(parseInt(item.id))));
                setFilteredRevenues(rev.filter(item => user?.favorites_revenues_id?.includes(parseInt(item.id))));
                setRecipes(rev.filter(item => user?.favorites_revenues_id?.includes(parseInt(item.id))));
                
            }).catch(error => {
                console.log('Error fetching revenues:', error);
            })
        }
    }, [])


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRevenues, setFilteredRevenues] = useState<Revnue[]>(revenues);

    const searchRevenues = (query: string) => {
        if(query.trim() === '') {
            setFilteredRevenues(revenues)
            return;
        }
        const searchTerm = searchQuery.toLowerCase()
        setFilteredRevenues(revenues.filter(task => task.name.toLowerCase().includes(searchTerm)))
    }

    const filterByType = (type: string) => {
        if(type === 'all' || type === null || type === undefined) {
            setFilteredRevenues(revenues);
            return;
        }
        setFilteredRevenues(revenues.filter(revenue => revenue.type.toLowerCase() === type.toLowerCase()));
    }

    return (
        <ScrollView
        className="p-4 bg-white"
            style={{
                /* flex: 1,
                justifyContent: "center",
                alignItems: "center", */
            }}
        >
            <Input className="my-1 w-full rounded-full border-gray-400 focus:border-gray-400">
                <InputField
                    type={"text"}
                    placeholder="Procure uma receita!"
                    onChangeText={text => { setSearchQuery(text); searchRevenues(text) }}
                />
                <InputSlot className="pr-3">
                    <InputIcon as={Search}/>
                </InputSlot>
            </Input>
            <Box className="my-4 w-36 ml-auto text-gray-400">
                <RNPickerSelect
                    onValueChange={(value) => filterByType(value)}
                    placeholder={{ label: 'Filtre por tipo', value: null }}
                    items={[
                        { label: 'Massa', value: 'Massa' },
                        { label: 'Brasileira', value: 'Brasileira' },
                        { label: 'Salada', value: 'Salada' },
                    ]}
                    Icon={() => {
                        return <PlusCircleIcon color="#9ca3af" size={20} />
                    }}
                />
            </Box>
            {filteredRevenues.map((revenue, index) => (
                <Box className="my-3" key={index}>
                    <RevenueCard {...revenue} />
                </Box>
                
            ))}
        </ScrollView>
    )
}