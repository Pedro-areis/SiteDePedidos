import { useContext } from "react"; //importa o hook useState;
import { Navigate } from "react-router-dom"; //importa o Navigate do react-router-dom;
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //importa o BrowserRouter, Routes e Route do react-router-dom;
import { PedidosContext } from "../context/pedidosContext.jsx"; //importa o PedidosContext do pedidosContext;

//importando os componentes da página
import Default from "./Default/Default.jsx";
import Home from "./home/home.jsx";
import Sumario from "./sumario/sumario.jsx";
import Carrinho from "./carrinho/carrinho.jsx";
import Pedidos from "./pedidos/pedidos.jsx";
import LoginPage from "./login/login.jsx";
import Cadastro from "./login/cadastro/cadastro.jsx";
import EditItens from "./home/edit_itens/edit_itens.jsx";

//função App para a troca de páginas;
function App() {
  const { login, setLogin } = useContext(PedidosContext);

  return (
    <BrowserRouter>
      {login && <Default />}
      {login && <Sumario />}

      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage setLogin={setLogin} />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas */}
        <Route path="/" element={login ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/carrinho"
          element={login ? <Carrinho /> : <Navigate to="/login" />}
        />
        <Route
          path="/pedidos"
          element={login ? <Pedidos /> : <Navigate to="/login" />}
        />
        <Route
          path="edit_itens"
          element={login ? <EditItens /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App; //exporta app para a main;
