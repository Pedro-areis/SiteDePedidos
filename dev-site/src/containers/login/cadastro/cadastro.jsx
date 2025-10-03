import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../services/api";

function Cadastro() {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const limparInputName = document.getElementById("name");
    limparInputName.value = "";

    const limparInputEmail = document.getElementById("email");
    limparInputEmail.value = "";

    const limparInputSenha = document.getElementById("password");
    limparInputSenha.value = "";
  }, []);

  const backLogin = () => {
    navigate("/login");
  };

  const createUser = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await api.post("/createUser", {
        nome,
        email,
        senha,
      });

      alert("Usuário cadastrado com sucesso! Faça o login para continuar.");
      navigate("/login");
    } catch {

      const limparInputName = document.getElementById("name");
      limparInputName.value = "";

      const limparInputEmail = document.getElementById("email");
      limparInputEmail.value = "";

      const limparInputSenha = document.getElementById("password");
      limparInputSenha.value = "";
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <main className="mainLogin">
      <section className="container">
        <div className="titulo">
          <h2>Faça o seu cadastro em nosso restaurante</h2>
        </div>
        <div className="info-login">
          <form>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              id="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />

            <div className="button">
              <button onClick={createUser}>Cadastrar</button>
              <button onClick={backLogin}>Voltar ao login</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Cadastro;
