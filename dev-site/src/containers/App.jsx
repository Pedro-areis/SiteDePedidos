import { useState } from "react"; //importa o hook useState;
import "./App.css";

//importando os componentes da página
import Default from "./Default/Default.jsx";
import Home from "./home/home.jsx";
import Sumario from "./sumario/sumario.jsx";
import Carrinho from "./carrinho/carrinho.jsx";
import Pedidos from "./pedidos/pedidos.jsx";

//função App para a troca de páginas;
function App() {
  const [pagina, setPagina] = useState("home"); //cria a variavel pagina para determinar o componente que será exibido;

  return (
    <>
      <Default />
      <div id="conteudo-principal">
        <Sumario setPagina={setPagina} />
        {pagina === "home" && <Home />}
        {pagina === "carrinho" && <Carrinho />}
        {pagina === "pedidos" && <Pedidos />}
      </div>
    </>
  );
}

export default App; //exporta app para a main;
