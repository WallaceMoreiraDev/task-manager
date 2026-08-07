import Feedback from "../../../components/Feedback"
import useLogin from "../hooks/useLogin"
import { Link } from "react-router-dom";

export default function Login() {

    const { email, password, feedback, setPassword, setEmail, handleLogin } = useLogin();

    return (
    <div className="container-login">
      <div className="div-login">
        <div className="div-titulo">
          <h1>Faça seu login</h1>
          <p>Entre com a sua conta ou crie uma conta!</p>
        </div>

        {feedback.info && <Feedback feedback={feedback} />}

        <form className="div-login-campos" onSubmit={(e) => {handleLogin(e)}}>
          <label htmlFor="email">Digite seu email</label>
          <input
            type="email"
            id="email"
            placeholder="joao123@gmail.com..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Digite a sua senha</label>
          <input
            type="password"
            id="senha"
            placeholder="senha123..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
          <p>
            Não tenho conta! <Link to="/create-account">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
