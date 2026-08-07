import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    //Criar lista de contas
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        //Renderizando e buscando contas na renderização pro estado

        async function getAllAccounts() {
            const accounts = await authService.getAccounts();
            setAccounts(accounts);

        }

        getAllAccounts();

    }, []);

    const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

    return (
        <AuthContext.Provider value={{ accounts, setAccounts, currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Use o contexto dentro do AuthProvider!");
    }

    return context;
}
