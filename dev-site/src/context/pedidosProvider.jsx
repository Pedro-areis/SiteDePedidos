//importações;
import api from "../services/api.js";

import { PedidosContext } from "./pedidosContext";
import { useState } from "react";

//função principal PedidosProvider (useContext);
export function PedidosProvider({ children }) {
  const [idUsuario, setIdUsuario] = useState(null); // Estado para armazenar o ID do usuário

  const [login, setLogin] = useState(false);

  const [user, setUser] = useState([]);

  const [produtoByType, setProdutoByType] = useState([]);
  const [produto, setProduto] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pedidosHistorico, setPedidosHistorico] = useState([]);
  const [produtoById, setProdutoById] = useState([]);
  const [type, setType] = useState("");

  // Função para buscar os produtos da API

  const getProdutos = async () => {
    try {
      const response = await api.get("/produtosDB");
      setProduto(response.data);
      console.log(produto);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const getProdutosByType = async () => {
    try {
      const response = await api.get("/produtosDB/tipo");
      setProdutoByType(response.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const getPedidos = async () => {
    try {
      const response = await api.get("/carrinho");
      setPedidos(response.data);
      console.log("Pedidos no carrinho:", response.data);
    } catch (err) {
      console.error("Erro ao buscar pedidos no carrinho:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/carrinho/${id}`);
      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedidos) => pedidos.id !== id)
      );
    } catch (err) {
      console.error("Erro ao excluir pedido:", err);
    }
  };

  const getHistorico = async () => {
    try {
      const response = await api.get("/historico");
      setPedidosHistorico(response.data);
      console.log("Pedidos no historico", response.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const updateStatus = async () => {
    const id = localStorage.getItem("pedido_id");
    try {
      console.log("ID do pedido no localStorage:", id);

      await api.put(`/historico/${id}`);

      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.pedido_id !== id)
      );

      localStorage.removeItem("pedido_id");

      console.log("Sucesso!!!!", id);
      getPedidos();
    } catch (err) {
      console.error("Erro ao finalizar pedido!", err);
    }
  };

  const getUserById = async () => {
    try {
      const response = await api.get("/user");
      setUser(response.data);
      console.log("Dados do usuário:", response.data);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  };

  const getProdutosById = async (id) => {
    try {
      const response = await api.get(`/produto/${id}`);
      setProdutoById(response.data);
      console.log("Dados do produto: ", response.data);
    } catch (error) {
      console.log("Erro ao buscar o produto: ", error);
    }
  };

  const updateType = async (id, tipo) => {
    if (tipo == "not_fav" || tipo == "invisible") {
      tipo = "fav";
    } else {
      tipo = "not_fav";
    }

    try {
      const response = await api.put(`/produtos/tipo/${id}`, { tipo: tipo });
      console.log("Dados do produto: ", response.data);
      getProdutosByType();
      getProdutos();
    } catch (error) {
      console.log("Erro ao buscar o produto: ", error);
    }
  };

  const invisibleProduct = async (id, tipo) => {
    if (tipo == "not_fav") {
      tipo = "invisible";
    } else {
      tipo = "not_fav";
    }

    try {
      const response = await api.put(`/produtos/tipo/${id}`, { tipo: tipo });

      setType("Produto invisivel para o cliente!");
      getProdutos();

      console.log("Dados do produto: ", response.data);
    } catch (error) {
      console.log("Erro ao buscar o produto: ", error);
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        getProdutos,
        produto,
        getPedidos,
        pedidos,
        deleteItem,
        getHistorico,
        pedidosHistorico,
        updateStatus,
        setLogin,
        login,
        setIdUsuario,
        idUsuario,
        getUserById,
        user,
        getProdutosById,
        produtoById,
        updateType,
        getProdutosByType,
        produtoByType,
        type,
        invisibleProduct,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
