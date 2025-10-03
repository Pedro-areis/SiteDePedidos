import "./config-user.css";

import { useState, useContext, useEffect } from "react";
import { PedidosContext } from "../../../context/pedidosContext";

function ConfigUser({ onClose }) {
  const { getUserById, user, updateCredenciais } = useContext(PedidosContext);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    getUserById();
  }, []);

  const limparCampos = () => {
    const limparInputEmail = document.getElementById("email");
    limparInputEmail.value = "";

    const limparInputSenha = document.getElementById("new_password");
    limparInputSenha.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCredenciais(newEmail, newPassword);
    limparCampos();
  };

  return (
    <div className="container-config-user">
      <div className="container-config">
        <div className="title">
          <h2>Configurações do Usuário</h2>
          <button className="fechar-tela" onClick={onClose}>
            X
          </button>
        </div>
        <div className="userName">
          <h2>Olá, {user.nome}</h2>
        </div>
        <div className="menu-config">
          <form>
            <span className="span-form">E-mail</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={user.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <br />
            <span className="span-form">Nova senha</span>
            <input
              type="password"
              name="new_password"
              id="new_password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <button type="submit" onClick={handleSubmit}>
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfigUser;
