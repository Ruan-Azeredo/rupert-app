import RevenueCard from "@/src/components/RevenueCard";
import { Box } from "@/src/components/ui/box";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

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
			
		}).catch(error => {
			console.log('Error fetching revenues:', error);
		})
    }, [])

    return (
        <ScrollView
        className="p-4 bg-white"
            style={{
                /* flex: 1,
                justifyContent: "center",
                alignItems: "center", */
            }}
        >
            <Text>I'm in tab</Text>
            {revenues.map((revenue, index) => (
                <Box className="my-3" key={index}>
                    <RevenueCard {...revenue} />
                </Box>
                
            ))}
        </ScrollView>
    )
}
