import { Router } from "express";
import multer from "multer";
import {
  getProdutos,
  getImagem,
  postPedidos,
  getPedidos,
  deleteItem,
  getHistorico,
  updateStatus,
  createUser,
  validarUser,
  autenticarToken,
  getUserById,
  getProdutosById,
  updateItem,
} from "./controllers/UserController.js";

const routes = Router();
const upload = multer();

routes.get("/produtosDB", getProdutos);
routes.get("/produtosDB/imagem/:id", getImagem);
routes.get("/carrinho", autenticarToken, getPedidos);
routes.get("/historico", autenticarToken, getHistorico);
routes.get("/produto/:id", getProdutosById);

routes.post("/pedidos", postPedidos);

routes.delete("/carrinho/:id", deleteItem);

routes.put("/historico/:pedido_id", updateStatus);
routes.put("/produto/att/:id", upload.single("imagem"), updateItem);

//rotas de usuário
routes.post("/createUser", createUser);
routes.post("/login", validarUser);
routes.get("/user", autenticarToken, getUserById);

export default routes;
