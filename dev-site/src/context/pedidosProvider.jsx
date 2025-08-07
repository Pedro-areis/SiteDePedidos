//importações;
import api from "../services/api.js";
import { PedidosContext } from "./pedidosContext";
import { useState } from "react";

//função principal PedidosProvider (useContext);
export function PedidosProvider({ children }) {
  const [produto, setProduto] = useState([]);

  // Função para buscar os produtos da API
  const getProdutos = async () => {
    try {
      const response = await api.get("/produtosDB");
      setProduto(response.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  return (
    <PedidosContext.Provider value={{ getProdutos, produto }}>
      {children}
    </PedidosContext.Provider>
  );
}
