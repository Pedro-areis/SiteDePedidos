import { useEffect, useState } from "react";
import "./login.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom"; //importa o useNavigate do react-router-dom;

function LoginPage({ setLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const limparInputEmail = document.getElementById("e-mail");
    limparInputEmail.value = "";

    const limparInputSenha = document.getElementById("senha");
    limparInputSenha.value = "";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        senha,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setLogin(true);
      navigate("/");

      localStorage.setItem("userId", response.data.userId);
      const userId = localStorage.getItem("userId");

      console.log(
        "Login bem-sucedido! Seu userId é: ",
        userId,
        " e o token é: ",
        token
      );
    } catch (err) {
      console.error(err);
      alert("Login ou senha incorretos. Tente novamente.");

      const limparInputEmail = document.getElementById("e-mail");
      limparInputEmail.value = "";

      const limparInputSenha = document.getElementById("senha");
      limparInputSenha.value = "";
    }
  };

  function handleCadastro() {
    navigate("/cadastro");
  }

  return (
    <main className="mainLogin">
      <section className="container">
        <div className="titulo">
          <h2>Bem vindo ao restaurante Tia Nastácia</h2>
        </div>
        <div className="info-login">
          <form>
            <input
              type="text"
              name="e-mail"
              id="e-mail"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <div className="button">
              <button onClick={handleLogin}>Login</button>
              <button type="button" onClick={handleCadastro}>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
