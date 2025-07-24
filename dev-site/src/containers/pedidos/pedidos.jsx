import { useContext, useEffect } from "react";
import "./pedidos.css"; //importa o css da página;
import { PedidosContext } from "../../context/pedidosContext.jsx";

function Pedidos() {
  //função que cria os metodos da página carrinho;

  const { getHistorico, products } = useContext(PedidosContext);
  useEffect(() => {
    getHistorico();
    console.log(products);
  }, []);

  return (
    <div className="homePedidos">
      <div className="inicioPedidos">
        <h2>Meus Pedidos</h2>
      </div>
      <div className="containerPedidos">
        <ul>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((pedidos) => {
              const itens = pedidos.pedido_enviado;
              console.log(itens);

              return (
                <li key={pedidos.id}>
                  <strong>Pedido {pedidos.id}: </strong>
                  {JSON.parse(itens).join(", ")}
                </li>
              );
            })
          ) : (
            <li>Sem pedidos no carrinho</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Pedidos; //importa a função para a página main;
