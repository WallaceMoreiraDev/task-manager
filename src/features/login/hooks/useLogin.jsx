import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { registerSchema, loginSchema } from "../config/loginFormConfig";
import * as authService from "../services/authService"
import { useNavigate } from "react-router-dom";

export default function useLogin(initialEmail = '', initialPassword = '', initialAccounts) {
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(initialPassword);
    const [feedback, setFeedback] = useState({ info: '', message: '' });
    const { setAccounts, setCurrentUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            setFeedback({ info: '', message: '' });
        }, 5000)

        return () => {
            clearTimeout(timer);
        }

    }, [feedback]);

    function cleanForm() {
        setEmail('');
        setPassword('');
    }

    async function handleLogin(e) {

        e.preventDefault();

        const data = { email: email, password: password };

        const schema = loginSchema.safeParse(data);

        if (!schema.success) {
            cleanForm();
            return setFeedback({ info: 'error', message: schema.error.issues[0].message || "Algo deu errado!" });
        }

        const validation = await authService.login(data);

        console.log(validation);

        if (!validation.success) {
            cleanForm();
            console.log("Erro no validation.success hook login, veja o valor que vem: ", validation)
            return setFeedback({ info: 'error', message: validation.message || "Algo deu errado!" });
        }

        setFeedback({ info: 'success', message: "Login realizado som sucesso!" });

        setCurrentUser(validation.account);



        navigate('/dashboard');

    }

    async function handleCreate(e) {
        //Lidar como o submit e estado de feedback!

        e.preventDefault();

        const newAccount = { email: email, password: password };

        console.log("Nova conta que é pra ser criada: ", newAccount)

        //Testar campos com zod
        const schema = registerSchema.safeParse(newAccount);

        console.log("Resultado schema: ", schema)

        if (!schema.success) {
            console.log("Erro no schema, setando erro")
            return setFeedback({ info: 'error', message: schema.error.issues[0].message });
        }

        const validation = await authService.createAccount(newAccount) || { success: false, message: "Algo deu errado! Tente novamente mais tarde." };

        if (!validation.success) {
            cleanForm()
            return setFeedback({ info: 'error', message: validation.message || 'Algo deu errado! Tente novamente mais tarde' });
        }

        console.log("Conta criada, veja essa account: ", validation.account);

        //Salvando aqui no estado para atualizar na tela do usuário caso precise!
        setAccounts(prev => [...prev, validation.account]);

        setFeedback({ info: 'success', message: 'Conta criada com sucesso!' });
        cleanForm();

    }

    return { email, password, feedback, setPassword, setEmail, handleCreate, handleLogin };
}
