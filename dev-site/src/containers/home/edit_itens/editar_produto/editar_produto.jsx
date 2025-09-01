import "./editar_produto.css";

function EditarProduto({ onClose }) {
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
          <form></form>
        </div>
      </div>
    </div>
  );
}

export default EditarProduto;
