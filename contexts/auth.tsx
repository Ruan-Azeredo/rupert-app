import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
    user: {
        username: string;
        favorites_revenues_id?: number[];
        createdAt?: string;
        id?: number;
    } | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    signin: (email: string, password: string) => void;
	recipes: any[];
	setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

	const toast = useToast()
	
	const showNewToast = (title: string, description: string) => {
		const newId = Math.random()
		toast.show({
			id: newId + 'toast',
			placement: "top",
			duration: 3000,
			render: ({ id }) => {
				const uniqueToastId = "toast-" + id
				return (
					<Toast
					nativeID={uniqueToastId} action="muted" variant="solid">
						<ToastTitle>{title}</ToastTitle>
						<ToastDescription>
						{description}
						</ToastDescription>
					</Toast>
				)
			}

		})
	}

    const [user, setUser] = useState<{
        username: string;
        favorites_revenues_id?: number[];
        createdAt?: string;
        id?: number;
    } | null>(null);

	const [recipes, setRecipes] = useState<any[]>([]);

    const login = (email: string, password: string) => {
		console.log('signin', { email, password });
		
		fetch('https://683e489b1cd60dca33daeb66.mockapi.io/api/users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			if (res.ok) {

                const res_json = res.json();
				return res_json;
			}
		}).then(users => {
			if (!users) {
				return;
			}
            console.log('users fetched', users);
			const user = users.find((user: any) => user.email === email && user.password === password)
			user ? setUser(user) : console.log('Usuário ou senha inválidos'); showNewToast('Ops!', 'Usuário ou senha inválidos');
		}).catch(error => {
			console.log('Error fetching users:', error);
			showNewToast('Ops!', 'Erro ao validar suar credenciais');
		})
	}

    const signin = (email: string, password: string) => {
		console.log('singin', { email, password });

		fetch('https://683e489b1cd60dca33daeb66.mockapi.io/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password
			})
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(user => {
			console.log(user)
			showNewToast('Successo!', 'Usuario cadastrado com sucesso');
		}).catch(error => {
			console.log('Error fetching users:', error);
			showNewToast('Ops!', 'Erro ao cadastrar suar credenciais');
		})
	}

    const logout = () => {
        setUser(null);
		setRecipes([]);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signin, recipes, setRecipes }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};