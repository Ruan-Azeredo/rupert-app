import RevenueCard from "@/src/components/RevenueCard";
import { Box } from "@/src/components/ui/box";
import { Input, InputField, InputIcon, InputSlot } from "@/src/components/ui/input";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

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


export default function Receitas() {

    const [revenues, setRevenues] = useState<Revnue[]>([]);

    useEffect(() => {
        fetch('https://683e489b1cd60dca33daeb66.mockapi.io/api/revenues', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(rev => {
			if (!rev) {
				return;
			}
            console.log('revenues fetched');
            setRevenues(rev);
            setFilteredRevenues(rev);
			
		}).catch(error => {
			console.log('Error fetching revenues:', error);
		})
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
            {filteredRevenues.map((revenue, index) => (
                <Box className="my-3" key={index}>
                    <RevenueCard {...revenue} />
                </Box>
                
            ))}
        </ScrollView>
    )
}
