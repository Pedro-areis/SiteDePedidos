import "./carrinho.css"; //importa o css da página;
import { useEffect, useContext } from "react";
import { PedidosContext } from "../../context/pedidosContext";

function Carrinho() {
  //função que cria os metodos da página carrinho;
  const { getPedidos, pedidos, deleteItem, updateStatus } =
    useContext(PedidosContext);

  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <main>
      <h2>Produtos no carrinho</h2>
      <div className="container-carrinho">
        {pedidos.length === 0 ? (
          <section className="container-carrinho-vazio">
            <p>Seu carrinho está vazio.</p>
          </section>
        ) : (
          pedidos.map((item, index) => (
            <section key={index}>
              <article>
                <div className="container-carrinho-item">
                  <p>
                    <strong>{item.produto}</strong>
                  </p>
                  <p>Quantidade: {item.quant_produto}</p>
                  <p>
                    Valor unitário: R$ {Number(item.valor_unitario).toFixed(2)}
                  </p>
                  <p>Valor total: R$ {Number(item.valor_total).toFixed(2)}</p>
                </div>
                <button onClick={() => deleteItem(item.id)}>
                  <img src="src/assets/img-excluir.png" alt="exluir" />
                </button>
              </article>
            </section>
          ))
        )}
      </div>
      <div className="botao-finalizar-pedido">
        <button onClick={() => updateStatus()}>
          Finalizar pedido
        </button>
      </div>
    </main>
  );
}

//exporta a função para a página main.jsx
export default Carrinho;
