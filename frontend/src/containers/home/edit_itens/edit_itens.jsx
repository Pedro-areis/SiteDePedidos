import "./edit_itens.css";
import { useContext, useEffect, useState } from "react";
import { PedidosContext } from "../../../context/pedidosContext";
import EditarProduto from "./editar_produto/editar_produto";
import NovoProduto from "../novo_produto/novo_produto";
import api from "../../../services/api";

import imgEditar from "../../../assets/img-editar.png";
import imgStar from "../../../assets/star-icon.png";
import imgArquivar from "../../../assets/img-arquivado.png";
import imgExcluir from "../../../assets/img-excluir.png";

function EditItens() {
  const {
    getProdutos,
    produto,
    getProdutosByType,
    produtoByType,
    updateType,
    invisibleProduct,
    type,
  } = useContext(PedidosContext);
  const [updateProduto, setUpdateProduto] = useState(false);
  const [addProduto, setAddProduto] = useState(false);

  useEffect(() => {
    getProdutos();
    getProdutosByType();
  }, []);

  const handleEditProduto = (id) => {
    localStorage.setItem("produto_id", id);
    setUpdateProduto(true);
  };

  const closeEditProduto = () => {
    getProdutos();
    getProdutosByType();
    setUpdateProduto(false);
  };

  const handleAddProduto = () => {
    setAddProduto(true);
  };

  const closeAddProduto = () => {
    getProdutos();
    getProdutosByType();
    setAddProduto(false);
  };

  const deleteProduto = async (id) => {
    try {
      await api.delete(`/produto/${id}`);
      getProdutos();
      getProdutosByType();
      alert("Produto deletado!");
    } catch {
      alert("Erro ao deletar produto.");
    }
  };

  return (
    <div className="container-edit-itens">
      <section className="produtos">
        <div className="titulo">
          <h2>Produtos em promoção</h2>
          <p className="obs">Recomendado manter 4 produtos em promoção</p>
        </div>
        <div className="itens-promo">
          {produtoByType.map((produto, index) => (
            <article key={index}>
              <div className="img-promo">
                <h3>{produto.nome}</h3>
                <img
                  src={`/produtosDB/imagem/${produto.id}`}
                  alt={produto.nome}
                />
              </div>
              <div className="info-item">
                <p>{produto.descricao}</p>
                <h3>
                  Valor: R${" "}
                  {Number(produto.valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="buttom-edit">
                <button onClick={() => handleEditProduto(produto.id)}>
                  <img src={imgEditar} alt="editar" />
                </button>
                <button onClick={() => updateType(produto.id, produto.tipo)}>
                  <img src={imgStar} alt="remover-de-promo" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="produtos">
        <div className="titulo">
          <h2>Produtos gerais</h2>
          <button onClick={handleAddProduto}>Adicionar novo produto</button>
        </div>
        <div className="itens-promo">
          {produto.map((produto, index) => (
            <article key={index}>
              <div className="img-promo">
                <h3>{produto.nome}</h3>
                <img
                  src={`/produtosDB/imagem/${produto.id}`}
                  alt={produto.nome}
                />
                {produto.tipo == "invisible" && (
                  <div className="invisible">{type}</div>
                )}
              </div>
              <div className="info-item">
                <p>{produto.descricao}</p>
                <h3>
                  Valor: R${" "}
                  {Number(produto.valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="buttom-edit-itens-not_fav">
                <button onClick={() => handleEditProduto(produto.id)}>
                  <img src={imgEditar} alt="editar" />
                </button>
                <button onClick={() => updateType(produto.id, produto.tipo)}>
                  <img
                    src={imgStar}
                    alt="adicionar-em-promo"
                  />
                </button>
                <button
                  onClick={() => invisibleProduct(produto.id, produto.tipo)}
                >
                  <img
                    src={imgArquivar}
                    alt="arquivar-produto"
                  />
                </button>
                <button onClick={() => deleteProduto(produto.id)}>
                  <img src={imgExcluir} alt="delete-produto" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {updateProduto && <EditarProduto onClose={closeEditProduto} />}
      {addProduto && <NovoProduto onClose={closeAddProduto} />}
    </div>
  );
}

export default EditItens;
