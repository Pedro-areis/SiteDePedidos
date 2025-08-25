import "./sumario.css"; //importa o código css;
import { useNavigate } from "react-router-dom"; //importa o useNavigate do react-router-dom;

function Sumario() {
  const navigate = useNavigate(); // Hook para navegação

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/carrinho")}>Carrinho</button>
      <button onClick={() => navigate("/pedidos")}>Pedidos</button>
    </nav>
  );
}

export default Sumario; //exporta a função para a página App.jsx
