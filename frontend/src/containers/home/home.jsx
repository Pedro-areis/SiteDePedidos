import "./home.css"; //importa o css da página;
import api from "../../services/api";
import Counter from "./counter";
import { useContext, useEffect, useState } from "react";
import { PedidosContext } from "../../context/pedidosContext";

import imgTelaInicial from "../../assets/img-tela-inicial.jpg";
import imgCarrinho from "../../assets/img-carrinho.png";

//função que cria os metodos do componente home;
function Home() {
  const { getProdutos, getProdutosByType, produtoByType, produto } =
    useContext(PedidosContext);
  const [counts, setCounts] = useState({}); //armazena a quantidade dos produtos selecionado;
  const [valorCarrinho, setValorCarrinho] = useState(0); //armazena a quantidade de itens no carrinho;
  const [itensSelecionados, setItensSelecionados] = useState([]); //armazena os itens selecionados para o carrinho;

  useEffect(() => {
    getProdutos();
    getProdutosByType();
  }, []);

  const handleCountChange = (productId, value) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: value,
    }));
  };

  const addProdutos = () => {
    const newItens = [];

    const todosOsProdutos = [...produtoByType, ...produto];

    for (const productId in counts) {
      const quantidade = counts[productId];

      if (quantidade > 0) {
        const item = todosOsProdutos.find((p) => p.id == productId);

        if (item) {
          newItens.push({
            nome: item.nome,
            valor: item.valor,
            quantidade: quantidade,
          });
        }
      }
    }

    setItensSelecionados((prev) => [...prev, ...newItens]);
  };

  const mostrarBotao = () => {
    return (
      <button
        onClick={() => {
          addProdutos();

          const novosItensCount = Object.values(counts).reduce(
            (soma, quantidade) => soma + Number(quantidade),
            0
          );

          setValorCarrinho((prevTotal) => prevTotal + novosItensCount);

          setCounts({});
        }}
      >
        Adicionar ao carrinho
      </button>
    );
  };

  const postPedidos = async () => {
    const pedidoId = localStorage.getItem("pedido_id");

    try {
      const user_id = localStorage.getItem("userId");
      const response = await api.post("/pedidos", {
        user_id: user_id,
        pedido_id: pedidoId,
        itens: itensSelecionados.map((item) => ({
          nome: item.nome,
          valor_unitario: item.valor,
          quantidade: item.quantidade,
        })),
      });

      if (!pedidoId && response.data?.pedido_id) {
        localStorage.setItem("pedido_id", response.data.pedido_id);
      }

      setItensSelecionados([]);
      setValorCarrinho(0);

      if (itensSelecionados.length == 0) {
        alert("Selecione um item para enviar ao carrinho.");
      } else {
        alert("Pedido enviado com sucesso!");
      }
    } catch {
      console.error("Erro ao enviar pedido:");
    }
  };

  useEffect(() => {
    setCounts({});
  }, [produtoByType]);

  return (
    <div className="home">
      <img
        src={imgTelaInicial}
        alt="img-tela-inicial"
        className="img-tela-inicial"
      />
      <div className="inicio">
        <h2>Promoções do dia</h2>
      </div>
      <section className="pedidosDia">
        {produtoByType.map((produto) => (
          <article key={produto.id}>
            <div className="img-promo">
              <h3>{produto.nome}</h3>
              <img
                src={`/produtosDB/imagem/${produto.id}`}
                alt={produto.nome}
              />
              {counts[produto.id] >= 1 ? mostrarBotao() : null}
            </div>

            <div className="info-item">
              <p>
                {produto.descricao} <br />
                <br />
              </p>
              <h3>
                Valor: R$
                {(produto.valor * (counts[produto.id] || 1)).toLocaleString(
                  "pt-BR",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </h3>
              <div className="set-quantidade">
                <Counter
                  count={counts[produto.id] || 0}
                  setCount={(value) => handleCountChange(produto.id, value)}
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="separador">
        <h2>Produtos gerais</h2>
      </div>

      <div className="produtos-gerais">
        <div className="containe-home">
          <h2>Pratos Principais (Para matar a fome do Pedrinho)</h2>
          {produto
            .filter(
              (produtos) =>
                produtos.tipo === "not_fav" &&
                produtos.categoria === "prato_principal"
            )
            .map((produto) => (
              <article key={produto.id}>
                <div className="img-produtos">
                  <h3>{produto.nome}</h3>
                  <img
                    src={`/produtosDB/imagem/${produto.id}`}
                    alt={produto.nome}
                  />
                  {counts[produto.id] >= 1 ? mostrarBotao() : null}
                </div>
                <div className="info-item">
                  <p>
                    {produto.descricao} <br />
                    <br />
                  </p>
                  <h3>
                    Valor: R$
                    {(produto.valor * (counts[produto.id] || 1)).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </h3>
                  <div className="set-quantidade">
                    <Counter
                      count={counts[produto.id] || 0}
                      setCount={(value) => handleCountChange(produto.id, value)}
                    />
                  </div>
                </div>
              </article>
            ))}
        </div>
        <div className="containe-home">
          <h2>Sobremesas (Os quitutes que a Cuca não resiste)</h2>
          {produto
            .filter(
              (produtos) =>
                produtos.tipo === "not_fav" &&
                produtos.categoria === "sobremesa"
            )
            .map((produto) => (
              <article key={produto.id}>
                <div className="img-produtos">
                  <h3>{produto.nome}</h3>
                  <img
                    src={`http://localhost:3000/produtosDB/imagem/${produto.id}`}
                    alt={produto.nome}
                  />
                  {counts[produto.id] >= 1 ? mostrarBotao() : null}
                </div>
                <div className="info-item">
                  <p>
                    {produto.descricao} <br />
                    <br />
                  </p>
                  <h3>
                    Valor: R$
                    {(produto.valor * (counts[produto.id] || 1)).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </h3>
                  <div className="set-quantidade">
                    <Counter
                      count={counts[produto.id] || 0}
                      setCount={(value) => handleCountChange(produto.id, value)}
                    />
                  </div>
                </div>
              </article>
            ))}
        </div>
        <div className="containe-home">
          <h2>Bebidas</h2>
          {produto
            .filter(
              (produtos) =>
                produtos.tipo === "not_fav" && produtos.categoria === "bebida"
            )
            .map((produto) => (
              <article key={produto.id}>
                <div className="img-produtos">
                  <h3>{produto.nome}</h3>
                  <img
                    src={`http://localhost:3000/produtosDB/imagem/${produto.id}`}
                    alt={produto.nome}
                  />
                  {counts[produto.id] >= 1 ? mostrarBotao() : null}
                </div>
                <div className="info-item">
                  <p>
                    {produto.descricao} <br />
                    <br />
                  </p>
                  <h3>
                    Valor: R$
                    {(produto.valor * (counts[produto.id] || 1)).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </h3>
                  <div className="set-quantidade">
                    <Counter
                      count={counts[produto.id] || 0}
                      setCount={(value) => handleCountChange(produto.id, value)}
                    />
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
      <div className="botao-carrinho">
        <button onClick={postPedidos}>
          <img src={imgCarrinho} alt="img_carrinho" />
        </button>
        <div className="indice-carrinho">
          <p>{valorCarrinho}</p>
        </div>
      </div>
    </div>
  );
}

export default Home; //exporta a função para a página main.jsx
