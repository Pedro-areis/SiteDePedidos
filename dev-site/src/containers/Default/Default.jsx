import "./Default.css"; //importa o css da página;
import { useState } from "react"; //importa o useState;

//função default da página (cabeçalho, conta, configurações, etc);
function Default() {
  const [menuAberto, setMenuAberto] = useState(false); //cria a variavel menuAberto para determinar se a irá apresentar o menu de usuario;

  //função toggleMenu para identificar quando houver a interação;
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
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
            <ul>
              <li>Meu perfil</li>
              <li>Configurações</li>
              <li>Sair</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Default; //exporta a função para a main.jsx
