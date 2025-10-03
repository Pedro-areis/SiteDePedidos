import "./novo_produto.css";
import api from "../../../services/api";
import { useState } from "react";

function NovoProduto({ onClose }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [desc, setDesc] = useState("");
  const [categoriaAtualizada, setCategoriaAtualizada] = useState("");
  const [img, setImg] = useState(null);

  const limparCampos = () => {
    const limparInputNome = document.getElementById("nm-produto");
    limparInputNome.value = "";

    const limparInputImagem = document.getElementById("new-img");
    limparInputImagem.value = null;

    const limparInputDesc = document.getElementById("desc");
    limparInputDesc.value = "";

    const limparInputValor = document.getElementById("price");
    limparInputValor.value = "";
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const valorFormatado = valor.replace(",", ".");
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", desc);
    formData.append("valor", valorFormatado);
    formData.append("imagem", img);
    formData.append("categoria", categoriaAtualizada);

    try {
      await api.post("/novo_produto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Produto adicionado!");
      limparCampos();
    } catch {
      console.error("Erro ao adicionar novo produto");
      alert("Erro ao adicionar produto. Tente novamente!");
    }
  };

  return (
    <div className="container-update-produto">
      <div className="main-container">
        <div className="title">
          <h2>Adicionar Novo Produto</h2>
          <button className="fechar-tela" onClick={onClose}>
            X
          </button>
        </div>
        <div className="menu-update-produto">
          <form onSubmit={addProduct}>
            <span>Nome do produto:</span>
            <input
              type="text"
              id="nm-produto"
              placeholder="Digite o nome do produto"
              onChange={(e) => setNome(e.target.value)}
            />
            <div className="file-new-img">
              <input
                type="file"
                name="alt-img"
                id="new-img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <span>Descrição:</span>
            <textarea
              name="descricao"
              id="desc"
              rows="4"
              cols="20"
              placeholder="Digite a descrição do produto"
              onChange={(e) => setDesc(e.target.value)}
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
              placeholder="Digite o preço do produto"
              onChange={(e) => setValor(e.target.value)}
            />
            <button type="submit" className="btn-salvar">
              Salvar Novo Produto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NovoProduto;
