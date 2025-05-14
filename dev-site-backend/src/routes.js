import { Router } from "express";
import {
  getPedidos,
  createPedidos,
  putPedidos,
  deletePedidos,
  pedidoEnviado,
  getPedidoEnviado,
} from "./controllers/UserController.js";

const routes = Router();

routes.get("/", getPedidos);
routes.post("/", createPedidos);
routes.put("/:id", putPedidos);
routes.delete("/", deletePedidos);

routes.get("/pedido_enviado", getPedidoEnviado);
routes.post("/historico", pedidoEnviado);

export default routes;
