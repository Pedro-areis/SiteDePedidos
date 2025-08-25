import "./Default.css"; //importa o css da página;
import { useState, useContext } from "react"; //importa o useState;
import { useNavigate } from "react-router-dom"; //importa o useNavigate do react-router-dom;
import { PedidosContext } from "../../context/pedidosContext";

//função default da página (cabeçalho, conta, configurações, etc);
function Default() {
  const [menuAberto, setMenuAberto] = useState(false); //cria a variavel menuAberto para determinar se a irá apresentar o menu de usuario;
  const navigator = useNavigate(); // Hook para navegação
  const { login, setLogin } = useContext(PedidosContext);

  //função toggleMenu para identificar quando houver a interação;
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigator("/login");
    setLogin(false);

    console.log("Usuário deslogado", login);
  };

  return (
    //header será a função pai da pagina
    <header>
      <h1>Cantina da Tia Nastacia</h1>
      <div id="usuario" onClick={toggleMenu}>
        {/*chama a função toggleMenu*/}
        <img src="src\assets\img_usuario.jpg" alt="Perfil" />
        {/*se menuAberto exibe a div menu-interativo (menu usuario)*/}
        {menuAberto && (
          <div id="menu-interativo">
            <form className="form-menu">
              <input type="button" id="meu-perfil" value="Meu Perfil" />
              <input type="button" id="config" value="Configurações" />
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
    </header>
  );
}

export default Default; //exporta a função para a main.jsx
