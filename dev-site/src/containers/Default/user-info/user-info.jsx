import "../config-user/config-user.css";

function UserInfo({ onClose }) {
  return (
    <div className="container-config-user">
      <div className="container-config">
        <div className="title">
          <h2>Informações do Usuário</h2>
          <button className="fechar-tela" onClick={onClose}>
            X
          </button>
        </div>
        <div className="userName">
          <h2>Olá, Usuário!</h2>
        </div>
        <div className="menu-config">
          <div className="info-user">
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
