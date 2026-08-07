import Feedback from "../../../components/Feedback"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"

export default function CreateAccount() {

    const { email, password, feedback, setPassword, setEmail, handleCreate } = useLogin();

    return (
        <div className="container-login">
            <div className="div-login">
                <div className="div-titulo">
                    <h1>Criar conta</h1>
                    <p>Crie a sua conta para consegui entrar!</p>
                </div>

                {feedback.info !== '' ? (<Feedback feedback={feedback} />) : null}
                <form className="div-login-campos" onSubmit={(e) => { handleCreate(e) }}>
                    <label htmlFor="email">Digite seu novo email</label>
                    <input required type="email" name="email" id="email" placeholder="joao123@gmail.com..." value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    <label htmlFor="senha">Digite a sua nova senha</label>
                    <input required type="password" name="senha" id="senha" placeholder="senha123..." value={password} onChange={(e) => { setPassword(e.target.value) }} />

                    <button>Criar conta</button>
                    <p>Já tenho uma conta! <Link to='/'>Fazer Login</Link></p>
                </form>

            </div>

        </div>
    )
}
