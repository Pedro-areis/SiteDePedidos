import "./Default.css"; //importa o css da página;
import ConfigUser from "./config-user/config-user.jsx"; //importa o componente ConfigUser;
import UserInfo from "./user-info/user-info.jsx";

import { useState, useContext } from "react"; //importa o useState;
import { useNavigate } from "react-router-dom"; //importa o useNavigate do react-router-dom;
import { PedidosContext } from "../../context/pedidosContext";

import imgUsuario from "../../assets/img_usuario.jpg";

//função default da página (cabeçalho, conta, configurações, etc);
function Default() {
  const [menuAberto, setMenuAberto] = useState(false); //cria a variavel menuAberto para determinar se a irá apresentar o menu de usuario;
  const navigator = useNavigate(); // Hook para navegação
  const { setLogin } = useContext(PedidosContext);

  // Estado para controlar a exibição do componente ConfigUser e UserInfo
  const [configUser, setConfigUser] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  //função toggleMenu para identificar quando houver a interação;
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigator("/login");
    setLogin(false);
  };

  const handleConfig = () => {
    setConfigUser(true);
    setMenuAberto(false);
  };

  const closeConfig = () => {
    setConfigUser(false);
  };

  const handleUserInfo = () => {
    setUserInfo(true);
    setMenuAberto(false);
  };

  const closeUserInfo = () => {
    setUserInfo(false);
  };

  return (
    //header será a função pai da pagina
    <header>
      <h1>Cantina da Tia Nastacia</h1>
      <div id="usuario" onClick={toggleMenu}>
        {/*chama a função toggleMenu*/}
        <img src={imgUsuario} alt="Perfil" />
        {/*se menuAberto exibe a div menu-interativo (menu usuario)*/}
        {menuAberto && (
          <div id="menu-interativo">
            <form className="form-menu">
              <input
                type="button"
                id="meu-perfil"
                value="Meu Perfil"
                onClick={handleUserInfo}
              />
              <input
                type="button"
                id="config"
                value="Configurações"
                onClick={handleConfig}
              />

              <input
                type="button"
                id="sair"
                value="Sair"
                onClick={handleLogout}
              />
            </form>
          </div>
        )}
      </div>
      {configUser && <ConfigUser onClose={closeConfig} />}
      {userInfo && <UserInfo onClose={closeUserInfo} />}
    </header>
  );
}

export default Default; //exporta a função para a main.jsx
