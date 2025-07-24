import { Router } from "express";
import {
  getPedidos,
  createPedidos,
  putPedidos,
  deletePedidos,
  pedidoEnviado,
  getPedidoEnviado,
  getHistorico,
} from "./controllers/UserController.js";

const routes = Router();

routes.get("/", getPedidos);
routes.post("/", createPedidos);
routes.put("/:id", putPedidos);
routes.delete("/", deletePedidos);

routes.get("/pedido_enviado", getPedidoEnviado);
routes.post("/historico", pedidoEnviado);

routes.get("/historico", getHistorico);

export default routes;
