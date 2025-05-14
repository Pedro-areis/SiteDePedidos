import "./carrinho.css"; //importa o css da página;
import { useContext, useEffect } from "react";
import { PedidosContext } from "../../context/pedidosContext.jsx";

function Carrinho() {
  //função que cria os metodos da página carrinho;

  const { buscarPedidos, item, historicoPedidos } = useContext(PedidosContext);

  useEffect(() => {
    buscarPedidos();
  }, [buscarPedidos]);

  const pedidosSubmit = (e) => {
    e.preventDefault();
    try {
      historicoPedidos();
    } catch (error) {
      console.error("Erro ao enviar pedidos", error);
      alert("Erro ao enviar os pedidos. Tente novamente.");
    }
  };

  return (
    <div className="homeCarrinho">
      <div className="inicioCarrinho">
        <h2>Itens Selecionados</h2>
      </div>
      <form className="form-carrinho" onSubmit={pedidosSubmit}>
        <div className="pedidos-ul">
          <ul>
            {item.length > 0 ? (
              item.map((pedido, index) => (
                <li key={pedido.id}>
                  <strong>Pedido {index + 1}: </strong>
                  {JSON.parse(pedido.item).join(", ")}
                </li>
              ))
            ) : (
              <li>Sem pedidos no carrinho</li>
            )}
          </ul>
        </div>
        <div className="finalizarCompra">
          <button>Finalizar Pedido</button>
        </div>
      </form>
    </div>
  );
}
//exporta a função para a página main.jsx
export default Carrinho;
