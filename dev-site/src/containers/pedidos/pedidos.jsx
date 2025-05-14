//import { useContext, useEffect } from "react";
import "./pedidos.css"; //importa o css da página;
//import { PedidosContext } from "../../context/pedidosContext.jsx";


function Pedidos() {
  //função que cria os metodos da página carrinho;

  return (
    <div className="homePedidos">
      <div className="inicioPedidos">
        <h2>Meus Pedidos</h2>
      </div>
      <div className="containerPedidos">
        <ul>
        </ul>
      </div>
    </div>
  );
}

export default Pedidos; //importa a função para a página main;
