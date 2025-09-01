import "./config-user.css";
import { useContext, useEffect } from "react";
import { PedidosContext } from "../../../context/pedidosContext";

function ConfigUser({ onClose }) {
  const { getUserById, user } = useContext(PedidosContext);

  useEffect(() => {
    getUserById();
  }, []);

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
            <input type="email" name="email" value={user.email} />
            <br />
            
            <span className="span-form">Nova senha</span>
            <input type="text" name="new_password" />
            <br />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfigUser;
