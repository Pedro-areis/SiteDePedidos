import "./pedidos.css"; //importa o css da página;
import { useEffect, useContext } from "react";
import { PedidosContext } from "../../context/pedidosContext";

function Pedidos() {
  //função que cria os metodos da página carrinho;
  const { getHistorico, pedidosHistorico } = useContext(PedidosContext);

  useEffect(() => {
    getHistorico();
  }, []);

  const pedidos = pedidosHistorico;

  return (
    <main>
      <h2>Historico de pedidos</h2>
      <div className="container-pedidos">
        {pedidos.length === 0 ? (
          <section className="container-historico-vazio">
            <p>Sem pedidos no historico.</p>
          </section>
        ) : (
          Object.values(
            pedidos.reduce((acc, item) => {
              if (!acc[item.pedido_id]) {
                acc[item.pedido_id] = {
                  pedido_id: item.pedido_id,
                  dt_pedido: item.dt_pedido,
                  status: item.status,
                  itens: [],
                  total: 0,
                };
              }

              const valorTotal = Number(item.valor_total) || 0;
              const valorUnitario = Number(item.valor_unitario) || 0;

              acc[item.pedido_id].itens.push({
                id: item.id,
                produto: item.produto,
                quant_produto: item.quant_produto,
                valor_unitario: valorUnitario,
                valor_total: valorTotal,
              });

              console.log(acc);
              acc[item.pedido_id].total += valorTotal;

              return acc;
            }, {})
          ).map((pedido) => (
            <section key={pedido.pedido_id}>
              <article>
                <h3>Pedido #{pedido.pedido_id}</h3>
                <p className="date">
                  <strong>Data:</strong>{" "}
                  {new Date(pedido.dt_pedido).toLocaleString()}
                </p>
                <div className="container-teste">
                  <div className="container-historico-itens">
                    {pedido.itens.map((item) => (
                      <p key={item.id}>
                        {item.quant_produto} X {item.produto} = R${" "}
                        {item.valor_total.toFixed(2)}
                      </p>
                    ))}
                  </div>
                  <div className="valor-total-pedido">
                    <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                  </div>
                </div>
              </article>
            </section>
          ))
        )}
      </div>
    </main>
  );
}

export default Pedidos; //importa a função para a página main;
