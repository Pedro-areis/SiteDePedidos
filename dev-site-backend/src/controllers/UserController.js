import conectDatabase from "../database/db.js";

const conection = conectDatabase();

async function getPedidos(req, res) {
  const consulta = "SELECT * FROM pedidos";

  conection.query(consulta, (err, data) => {
    if (err) return res.json(err);
    res.status(200).json(data);
  });
}

async function getPedidoEnviado(req, res) {
  const consulta = "SELECT item FROM pedidos";

  conection.query(consulta, (err, data) => {
    if (err) return res.json(err);
    res.status(200).json(data);
  });
}

async function createPedidos(req, res) {
  const consulta = "INSERT INTO pedidos(item) VALUES(?)";

  const values = JSON.stringify(req.body.item);

  conection.query(consulta, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json(values);
  });
}

function pedidoEnviado(req, res) {
  const consulta = "INSERT INTO carrinho(pedido_enviado) VALUES(?)";

  const values = JSON.stringify(req.body.pedido_enviado);

  conection.query(consulta, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json(values);
  });
}

function putPedidos(req, res) {
  const consulta = "UPDATE pedidos SET item = ? WHERE id = ?";

  const values = [req.body.item];

  conection.query(consulta, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Item atualizado");
  });
}

function deletePedidos(req, res) {
  const consulta = "DELETE FROM pedidos;";

  conection.query(consulta, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Item deletado");
  });
}

export {
  getPedidos,
  createPedidos,
  putPedidos,
  deletePedidos,
  pedidoEnviado,
  getPedidoEnviado,
};
