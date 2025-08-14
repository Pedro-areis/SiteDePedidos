import "./home.css"; //importa o css da página;
import api from "../../services/api";
import Counter from "./counter";
import { useContext, useEffect, useState } from "react";
import { PedidosContext } from "../../context/pedidosContext";

//função que cria os metodos do componente home;
function Home() {
  const { getProdutos, produto } = useContext(PedidosContext);
  const [counts, setCounts] = useState([]); //armazena a quantidade dos produtos selecionado;
  const [valorCarrinho, setValorCarrinho] = useState([]); //armazena a quantidade de itens no carrinho;
  const [itensSelecionados, setItensSelecionados] = useState([]); //armazena os itens selecionados para o carrinho;

  useEffect(() => {
    getProdutos();
  }, []);

  const handleCountChange = (index, value) => {
    const newCounts = [...counts];
    newCounts[index] = value;
    setCounts(newCounts);
  };

  const addProdutos = () => {
    const newItens = [];

    produto.forEach((item, index) => {
      if (counts[index] > 0) {
        newItens.push({
          nome: item.nome,
          valor: item.valor,
          quantidade: counts[index],
        });
      }
    });

    setItensSelecionados((prev) => [...prev, ...newItens]);
    console.log("Itens adicionados:", newItens);
  };

  const mostrarBotao = () => {
    return (
      <button
        className="btn-add-carrinho"
        onClick={() => {
          setValorCarrinho((prev) =>
            prev.length === counts.length
              ? prev.map((v, i) => v + (counts[i] || 0))
              : [...counts]
          );
          addProdutos();
          setCounts(Array(counts.length).fill(0));
          console.log("Valor do carrinho atualizado:", itensSelecionados);
        }}
      >
        Adicionar ao carrinho
      </button>
    );
  };

  useEffect(() => {
    setCounts(Array(produto.length).fill(0));
    setValorCarrinho(Array(produto.length).fill(0));
  }, [produto]);

  const postPedidos = async () => {
    const pedidoId = localStorage.getItem("pedido_id");
    try {
      const response = await api.post("/pedidos", {
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
      setValorCarrinho([]);

      console.log("Pedido enviado com sucesso:", response.data);
      console.log("Lista limpa:", itensSelecionados);
      console.log("LocalStorage é:", localStorage.getItem("pedido_id"));
      alert("Pedido enviado com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);
    }
  };

  return (
    <div className="home">
      <img
        src="src/assets/img-tela-inicial.jpg"
        alt="img-tela-inicial"
        className="img-tela-inicial"
      />
      <div className="inicio">
        <h2>Promoções do dia</h2>
      </div>
      <section className="pedidosDia">
        {produto.map((produto, index) => (
          <article key={index}>
            <div className="img-promo">
              <h3>{produto.nome}</h3>
              <img
                src={`http://localhost:3000/produtosDB/imagem/${produto.id}`}
                alt={produto.nome}
              />
              {counts[index] >= 1 ? mostrarBotao() : null}
            </div>

            <div className="info-item">
              <p>
                {produto.descricao} <br />
                <br />
              </p>
              <h3>
                Valor: R${" "}
                {counts[index] <= 1
                  ? Number(produto.valor).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  : (produto.valor * counts[index]).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
              </h3>
              <div className="set-quantidade">
                <Counter
                  count={counts[index]}
                  setCount={(value) => handleCountChange(index, value)}
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="produtos geral"></section>
      <div className="botao-carrinho">
        <button onClick={postPedidos}>
          <img src="src/assets/img-carrinho.png" alt="img_carrinho" />
        </button>
        <div className="indice-carrinho">
          <p>{valorCarrinho.reduce((total, count) => total + count, 0)}</p>
        </div>
      </div>
    </div>
  );
}

export default Home; //exporta a função para a página main.jsx
