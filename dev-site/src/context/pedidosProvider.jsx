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
    } catch {
      console.error("Erro ao buscar produtos:");
    }
  };

  const getProdutosByType = async () => {
    try {
      const response = await api.get("/produtosDB/tipo");
      setProdutoByType(response.data);
    } catch {
      console.error("Erro ao buscar produtos");
    }
  };

  const getPedidos = async () => {
    try {
      const response = await api.get("/carrinho");
      setPedidos(response.data);
    } catch {
      console.error("Erro ao buscar pedidos no carrinho:");
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/carrinho/${id}`);
      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedidos) => pedidos.id !== id)
      );
    } catch {
      console.error("Erro ao excluir pedido");
    }
  };

  const getHistorico = async () => {
    try {
      const response = await api.get("/historico");
      setPedidosHistorico(response.data);
    } catch {
      console.error("Erro ao buscar produtos");
    }
  };

  const updateStatus = async () => {
    const id = localStorage.getItem("pedido_id");
    try {
      await api.put(`/historico/${id}`);

      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.pedido_id !== id)
      );
      localStorage.removeItem("pedido_id");
      getPedidos();
    } catch {
      console.error("Erro ao finalizar pedido!");
    }
  };

  const getUserById = async () => {
    try {
      const response = await api.get("/user");
      setUser(response.data);
    } catch {
      console.error("Erro ao buscar usuário:");
    }
  };

  const getProdutosById = async (id) => {
    try {
      const response = await api.get(`/produto/${id}`);
      setProdutoById(response.data);
    } catch {
      console.error("Erro ao buscar o produto: ");
    }
  };

  const updateType = async (id, tipo) => {
    if (tipo == "not_fav" || tipo == "invisible") {
      tipo = "fav";
    } else {
      tipo = "not_fav";
    }
    try {
      await api.put(`/produtos/tipo/${id}`, { tipo: tipo });
      getProdutosByType();
      getProdutos();
    } catch {
      console.log("Erro ao buscar o produto");
    }
  };

  const invisibleProduct = async (id, tipo) => {
    if (tipo == "not_fav") {
      tipo = "invisible";
    } else {
      tipo = "not_fav";
    }
    try {
      await api.put(`/produtos/tipo/${id}`, { tipo: tipo });
      setType("Produto invisivel para o cliente!");
      getProdutos();
    } catch {
      console.error("Erro ao buscar o produto");
    }
  };

  const updateCredenciais = async (email, senha) => {
    try {
      await api.put("/user", { email, senha });
      alert("Credenciais atualizadas com sucesso!");
      getUserById();
    } catch {
      alert("Erro ao atualizar credenciais. Tente novamente!");
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
        updateCredenciais,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
