import conectDatabase from "../database/db.js";

const conection = conectDatabase();

// Função para obter todos os produtos disponíveis no restaurante;
async function getProdutos(req, res) {
  const consulta = "SELECT * FROM produtos";

  conection.query(consulta, (err, data) => {
    if (err) return res.json(err);
    res.status(200).json(data);
  });
}

// Função para obter a imagem de um produto específico pelo ID
async function getImagem(req, res) {
  const { id } = req.params;
  const consulta = "SELECT imagem FROM produtos WHERE id = ?";

  conection.query(consulta, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "Produto não encontrado" });

    res.setHeader("Content-Type", "image/png");
    res.end(data[0].imagem);
  });
}

async function postPedidos(req, res) {
  const itens = req.body.itens;

  let pedidoId = itens.pedido_id;

  if (!pedidoId) {
    const consultaID = "INSERT INTO pedidos () VALUES ()";
    conection.query(consultaID, [], (err, data) => {
      if (err) reject(err);
      else resolve([data]);
    });
  }

  const consultaItem =
    "INSERT INTO itens_pedidos (pedido_id, produto, quant_produto, valor_unitario) VALUES (?, ?, ?, ?)";

  try {
    for (const item of itens) {
      const [result] = await new Promise((resolve, reject) => {
        conection.execute(
          consultaItem,
          [pedidoId, item.nome, item.quantidade, item.valor_unitario],
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
      pedidoId = result.insertId;
    }

    res
      .status(201)
      .json({ message: "Todos os itens foram inseridos com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir itens" });
  }
}

async function getPedidos(req, res) {
  const consulta =
    "SELECT itens_pedidos.* FROM itens_pedidos JOIN pedidos ON itens_pedidos.pedido_id = pedidos.id WHERE pedidos.status = 0";

  conection.query(consulta, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
}

async function deleteItem(req, res) {
  const { id } = req.params;
  const consulta = "DELETE FROM itens_pedidos WHERE id = ?";

  conection.query(consulta, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "Item não encontrado" });

    res.status(200).json({ message: "Item deletado com sucesso" });
  });
}

async function deletePedido(req, res) {
  const { id } = req.params;
  const consulta = "DELETE FROM pedidos WHERE id = ?";

  conection.query(consulta, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "Pedido não encontrado" });
    res.status(200).json({ message: "Pedido deletado com sucesso" });
  });
}

async function getHistorico(req, res) {
  const consulta =
    "SELECT itens_pedidos.*, pedidos.dt_pedido, pedidos.status FROM itens_pedidos JOIN pedidos ON itens_pedidos.pedido_id = pedidos.id WHERE pedidos.status = 1";

  conection.query(consulta, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
}

async function updateStatus(req, res) {
  const { id } = req.params;

  const consulta = "UPDATE pedidos SET `status` = 1 WHERE id = ?";

  conection.query(consulta, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "Pedido não encontrado" });
    res.status(200).json({ message: "Pedido enviado para o historico" });
  });
}

export {
  getProdutos,
  getImagem,
  postPedidos,
  getPedidos,
  deletePedido,
  deleteItem,
  getHistorico,
  updateStatus,
};
