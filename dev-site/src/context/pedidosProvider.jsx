//importações;
import { useState, useCallback } from "react";
import api from "../services/api.js";
import { PedidosContext } from "./pedidosContext";

let arrayTest = [];

//função principal PedidosProvider (useContext);
export function PedidosProvider({ children }) {
  const [item, setItem] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [products, setProducts] = useState([]);

  //const para registrar os itens selecionados no form em Home;
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

  //const para o envio dos itens para o banco de dados na tabela pedidos;
  const handleSubmit = async (e) => {
    e.preventDefault(); //impede o comportamento padrão de recarregar a página

    if (pedidos.length === 0) {
      alert("Selecione algum item para enviar o pedido!");
      return;
    }

    try {
      arrayTest.push(pedidos);
      setPedidos([]);
      console.log("Pedido enviado com sucesso!", arrayTest);
      alert("Pedidos enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar pedidos", error);
      setPedidos([]);
      alert("Erro ao enviar os pedidos.");
    }
  };

  //const para o get da tabela pedidos
  const buscarPedidos = useCallback(async () => {
    try {
      setItem(arrayTest);
    } catch {
      console.log("Erro ao encontrar pedido!");
    }
  }, []);

  //const para a "cópia" dos dados da tabela pedidos em uma nova tabela carrinho;
  const historicoPedidos = async () => {
    try {
      const response = await api.post("/historico", {
        pedido_enviado: item,
      });
      console.log("Pedido finalizado!", response.data);
      setItem([]);
      arrayTest = [];
      console.log("O array está vazio", arrayTest);
    } catch {
      console.log("Erro ao enviar pedido para historico!");
    }
  };

  const getHistorico = useCallback(async () => {
    try {
      const response = await api.get("/historico");
      setProducts(response.data);
    } catch {
      console.log("Erro ao visualizar historico de pedidos!");
    }
  }, []);

  //return enviando via props as funções que serão utilizadas nos componentes;
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
        getHistorico,
        products,
        arrayTest,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
