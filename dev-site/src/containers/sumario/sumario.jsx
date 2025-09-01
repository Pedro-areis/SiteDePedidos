import "./sumario.css"; //importa o código css;
import { useNavigate } from "react-router-dom"; //importa o useNavigate do react-router-dom;

function Sumario() {
  const navigate = useNavigate(); // Hook para navegação
  const role = localStorage.getItem("role");

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/carrinho")}>Carrinho</button>
      <button onClick={() => navigate("/pedidos")}>Pedidos</button>
      {role == "admin" ? (
        <button onClick={() => navigate("/edit_itens")}>Editar Itens</button>
      ) : null}
    </nav>
  );
}

export default Sumario; //exporta a função para a página App.jsx
