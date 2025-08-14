import { Router } from "express";
import {
  getProdutos,
  getImagem,
  postPedidos,
  getPedidos,
  deleteItem,
  getHistorico,
  updateStatus,
} from "./controllers/UserController.js";

const routes = Router();

routes.get("/produtosDB", getProdutos);
routes.get("/produtosDB/imagem/:id", getImagem);
routes.get("/carrinho", getPedidos);
routes.get("/historico", getHistorico);

routes.post("/pedidos", postPedidos);

routes.delete("/carrinho/:id", deleteItem);

routes.put("/historico/:pedido_id", updateStatus);

export default routes;
