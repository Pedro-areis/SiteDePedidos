import { useState, useCallback } from "react";
import api from "../services/api.js";
import { PedidosContext } from "./pedidosContext";

export function PedidosProvider({ children }) {
  const [item, setItem] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const handleChange = (e) => {
    const pedidoId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setPedidos([...pedidos, pedidoId]);
    } else {
      setPedidos(pedidos.filter((id) => id !== pedidoId));
    }
    console.log("Você adicionou", pedidoId, "ao carrinho");
    console.log(pedidos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    if (pedidos.length === 0) {
      alert("Selecione algum item para enviar o pedido!");
      return;
    }

    try {
      const response = await api.post("/", {
        item: pedidos,
      });
      console.log("Pedido enviado com sucesso!", response.data);
      setPedidos([]);
      alert("Pedidos enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar pedidos", error);
      setPedidos([]);
      alert("Erro ao enviar os pedidos.");
    }
  };

  const buscarPedidos = useCallback(async () => {
    try {
      const response = await api.get("/");
      setItem(response.data);
    } catch {
      console.log("Erro ao encontrar pedido!");
    }
  }, []);

  const historicoPedidos = async () => {
    try {
      const response = await api.post("/historico", {
        pedido_enviado: item
      });
      console.log("Itens armazenados no carrinho!", response.data);

      const responseDelete = await api.delete("/");
      console.log("Pedidos deletados", responseDelete);
      setItem([]);
      console.log(item);

    } catch {
      console.log("Erro ao enviar pedido para historico!");
    }
  };


  return (
    <PedidosContext.Provider
      value={{
        handleChange,
        handleSubmit,
        pedidos,
        item,
        setItem,
        buscarPedidos,
        historicoPedidos,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
