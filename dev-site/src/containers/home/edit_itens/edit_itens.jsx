import "./edit_itens.css";
import { useContext, useEffect, useState } from "react";
import { PedidosContext } from "../../../context/pedidosContext";
import EditarProduto from "./editar_produto/editar_produto";

function EditItens() {
  const { getProdutos, produto } = useContext(PedidosContext);
  const [updateProduto, setUpdateProduto] = useState(false);
  useEffect(() => {
    getProdutos();
  }, []);

  const handleEditProduto = (id) => {
    localStorage.setItem("produto_id", id);
    setUpdateProduto(true);
  };

  const closeEditProduto = () => {
    setUpdateProduto(false);
  };

  return (
    <div className="container-edit-itens">
      <section className="produtos">
        <div className="titulo">
          <h2>Editar itens em promoção</h2>
        </div>
        <div className="itens-promo">
          {produto.map((produto, index) => (
            <article key={index}>
              <div className="img-promo">
                <h3>{produto.nome}</h3>
                <img
                  src={`http://localhost:3000/produtosDB/imagem/${produto.id}`}
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
                  <img src="src/assets/img-editar.png" alt="editar" />
                </button>
                <button>
                  <img src="src/assets/star-icon.png" alt="remover-de-promo" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="produtos"></section>
      {updateProduto && <EditarProduto onClose={closeEditProduto} />}
    </div>
  );
}

export default EditItens;
