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
  updateType,
  getProdutosByType,
  adiconarNovoProduto,
  deleteProduto,
  updateCredenciais,
} from "./controllers/UserController.js";

const routes = Router();
const upload = multer();

routes.get("/produtosDB", getProdutos);
routes.get("/produtosDB/tipo", getProdutosByType);
routes.get("/produtosDB/imagem/:id", getImagem);
routes.get("/carrinho", autenticarToken, getPedidos);
routes.get("/historico", autenticarToken, getHistorico);
routes.get("/produto/:id", getProdutosById);

routes.post("/pedidos", postPedidos);
routes.post("/novo_produto", upload.single("imagem"), adiconarNovoProduto);

routes.delete("/carrinho/:id", deleteItem);
routes.delete("/produto/:id", deleteProduto);

routes.put("/historico/:pedido_id", updateStatus);
routes.put("/produto/att/:id", upload.single("imagem"), updateItem);
routes.put("/produtos/tipo/:id", updateType);
routes.put("/user", autenticarToken, updateCredenciais);

//rotas de usuário
routes.post("/createUser", createUser);
routes.post("/login", validarUser);
routes.get("/user", autenticarToken, getUserById);

export default routes;
