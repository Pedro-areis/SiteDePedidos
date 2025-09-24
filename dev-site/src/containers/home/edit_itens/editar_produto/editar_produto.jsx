import "./editar_produto.css";
import { useContext, useEffect, useState } from "react";
import { PedidosContext } from "../../../../context/pedidosContext";
import api from "../../../../services/api";

function EditarProduto({ onClose }) {
  const { getProdutosById, produtoById } = useContext(PedidosContext);

  const [nomeAtualizado, setNomeAtualizado] = useState("");
  const [valorAtualizado, setValorAtualizado] = useState("");
  const [descAtualizada, setDescAtualizada] = useState("");
  const [categoriaAtualizada, setCategoriaAtualizada] = useState("");
  const [imgAtualizada, setImgAtualizada] = useState(null);

  const item = produtoById;

  const limparCampos = () => {
    const limparInputNome = document.getElementById("nm-produto");
    limparInputNome.value = "";

    const limparInputImagem = document.getElementById("alt-img");
    limparInputImagem.value = null;

    const limparInputDesc = document.getElementById("desc");
    limparInputDesc.value = "";

    const limparInputValor = document.getElementById("price");
    limparInputValor.value = "";
  };

  const updateItem = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("produto_id");

    const valorFormatado = valorAtualizado.replace(",", ".");

    const formData = new FormData();
    formData.append("nome", nomeAtualizado);
    formData.append("valor", valorFormatado);
    formData.append("descricao", descAtualizada);
    formData.append("categoria", categoriaAtualizada);

    if (imgAtualizada) {
      formData.append("imagem", imgAtualizada);
    }
    try {
      const response = await api.put(`/produto/att/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Produto atualizado!");
      limparCampos();

      console.log("Pedido atualizado", response.data);
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);
      alert("Erro ao atualizar produto.");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("produto_id");
    getProdutosById(id);
  }, []);

  return (
    <div className="container-update-produto">
      <div className="main-container">
        <div className="title">
          <h2>Editar produto</h2>
          <button className="fechar-tela" onClick={onClose}>
            X
          </button>
        </div>
        <div className="menu-update-produto">
          <form onSubmit={updateItem}>
            <span>Nome do produto:</span>
            <input
              type="text"
              id="nm-produto"
              placeholder={item.nome}
              onChange={(e) => setNomeAtualizado(e.target.value)}
            />
            <div className="img-produto">
              <img
                src={`http://localhost:3000/produtosDB/imagem/${item.id}`}
                alt={item.nome}
              />
              <div className="file-alt-img">
                <label htmlFor="alt-img">
                  <img
                    src="src/assets/img-file.jpg"
                    alt="alterar-imagem-produto"
                  />
                </label>
                <input
                  type="file"
                  name="alt-img"
                  id="alt-img"
                  onChange={(e) => setImgAtualizada(e.target.files[0])}
                />
              </div>
            </div>
            <span>Descrição:</span>
            <textarea
              name="descricao"
              id="desc"
              rows="4"
              cols="20"
              placeholder={item.descricao}
              onChange={(e) => setDescAtualizada(e.target.value)}
            ></textarea>
            <span>Categoria:</span>
            <div className="categoria">
              <select
                name="categoria"
                id="categoria"
                onChange={(e) => setCategoriaAtualizada(e.target.value)}
                value={categoriaAtualizada}
              >
                <option value="">--Selecione a categoria--</option>
                <option value="prato_principal">Prato Principal</option>
                <option value="bebida">Bebida</option>
                <option value="sobremesa">Sobremesa</option>
              </select>
            </div>
            <span>Preço:</span>
            <input
              type="text"
              name="valor"
              id="price"
              placeholder={Number(item.valor).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
              onChange={(e) => setValorAtualizado(e.target.value)}
            />
            <button type="submit">Atualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarProduto;
