//importações;
import api from "../services/api.js";

import { PedidosContext } from "./pedidosContext";
import { useState } from "react";

//função principal PedidosProvider (useContext);
export function PedidosProvider({ children }) {
  const [idUsuario, setIdUsuario] = useState(null); // Estado para armazenar o ID do usuário

  const [login, setLogin] = useState(false);

  const [produto, setProduto] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pedidosHistorico, setPedidosHistorico] = useState([]);
  // Função para buscar os produtos da API

  const getProdutos = async () => {
    try {
      const response = await api.get("/produtosDB");
      setProduto(response.data);
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
    try {
      const id = Number(localStorage.getItem("pedido_id"));

      console.log("ID do pedido no localStorage:", id);
      
      await api.put(`/historico/${id}`);

      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.pedido_id !== id)
      );

      localStorage.removeItem("pedido_id");

      console.log("Sucesso!!!!", id);
    } catch (err) {
      console.error("Erro ao finalizar pedido!", err);
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
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
