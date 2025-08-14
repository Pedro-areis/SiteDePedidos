import conectDatabase from "../database/db.js";

const conection = conectDatabase();

// Função para obter todos os produtos disponíveis no restaurante;
async function getProdutos(req, res) {
  try {
    const [rows] = await conection.query("SELECT * FROM produtos");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Função para obter a imagem de um produto específico pelo ID
async function getImagem(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await conection.query(
      "SELECT imagem FROM produtos WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.setHeader("Content-Type", "image/png");
    res.end(rows[0].imagem);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function postPedidos(req, res) {
  const itens = req.body.itens;

  try {
    let pedidoId;

    // Verifica se já existe pedido aberto
    const [rows] = await conection.query(
      "SELECT id FROM pedidos WHERE status = 0 LIMIT 1"
    );

    if (rows.length > 0) {
      pedidoId = rows[0].id;
    } else {
      const [result] = await conection.query(
        "INSERT INTO pedidos (status) VALUES (0)"
      );
      pedidoId = result.insertId;
    }

    // Insere os itens
    for (const item of itens) {
      await conection.query(
        "INSERT INTO itens_pedidos (pedido_id, produto, quant_produto, valor_unitario) VALUES (?, ?, ?, ?)",
        [pedidoId, item.nome, item.quantidade, item.valor_unitario]
      );
    }

    res.status(201).json({
      message: "Todos os itens foram inseridos com sucesso",
      pedido_id: pedidoId,
    });
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
}

async function getPedidos(req, res) {
  try {
    const [rows] = await conection.query(`
      SELECT itens_pedidos.* 
      FROM itens_pedidos 
      JOIN pedidos ON itens_pedidos.pedido_id = pedidos.id 
      WHERE pedidos.status = 0
    `);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteItem(req, res) {
  const { id } = req.params;
  try {
    const [result] = await conection.query(
      "DELETE FROM itens_pedidos WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    res.status(200).json({ message: "Item deletado com sucesso" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getHistorico(req, res) {
  try {
    const [rows] = await conection.query(`
      SELECT itens_pedidos.*, pedidos.dt_pedido, pedidos.status 
      FROM itens_pedidos 
      JOIN pedidos ON itens_pedidos.pedido_id = pedidos.id 
      WHERE pedidos.status = 1
    `);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateStatus(req, res) {
  const { pedido_id } = req.params;
  try {
    const [result] = await conection.query(
      "UPDATE pedidos SET status = 1 WHERE id = ?",
      [pedido_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    res.status(200).json({ message: "Pedido enviado para o historico" });
  } catch (err) {
    res.status(500).json(err);
  }
}

export {
  getProdutos,
  getImagem,
  postPedidos,
  getPedidos,
  deleteItem,
  getHistorico,
  updateStatus,
};
