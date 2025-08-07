import { Router } from "express";
import {
  getProdutos,
  getImagem,
  postPedidos,
} from "./controllers/UserController.js";

const routes = Router();

routes.get("/produtosDB", getProdutos);
routes.get("/produtosDB/imagem/:id", getImagem);
routes.post("/pedidos", postPedidos);

export default routes;
