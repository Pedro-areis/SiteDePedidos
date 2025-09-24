import conectDatabase from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const conection = conectDatabase();

const SECRET = "CHAVE_SECRETA";

async function createUser(req, res) {
  const { nome, email, senha } = req.body;

  try {
    console.log(req.body);
    if (!senha) return res.status(400).json({ error: "Senha não fornecida" });

    const hash = await bcrypt.hash(senha, 10);

    const [result] = await conection.query(
      "INSERT INTO users (nome, email, senha_hash) VALUES (?, ?, ?)",
      [nome, email, hash]
    );

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

async function validarUser(req, res) {
  const { email, senha } = req.body;

  try {
    const [rows] = await conection.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const usuario = rows[0];
    const valido = await bcrypt.compare(senha, usuario.senha_hash);

    if (!valido) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Cria token com id e role
    const token = jwt.sign({ userId: usuario.id }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userId: usuario.id, role: usuario.role });
  } catch (err) {
    console.error("Erro ao validar usuário:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token expirado ou inválido" });
  }
}

async function getProdutosById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await conection.query(
      "SELECT * FROM produtos WHERE id = ?",
      [id]
    );
    res.status(202).json(rows[0]);
  } catch (err) {
    res.status(502).json(err);
  }
}

// Função para obter todos os produtos disponíveis no restaurante;
async function getProdutos(req, res) {
  try {
    const [rows] = await conection.query(
      "SELECT * FROM produtos WHERE tipo IN ('not_fav', 'invisible')"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getProdutosByType(req, res) {
  try {
    const [rows] = await conection.query(
      "SELECT * FROM produtos WHERE tipo = 'fav'"
    );
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
  const { itens, user_id } = req.body;

  try {
    let pedidoId;

    // Verifica se já existe pedido aberto
    const [rows] = await conection.query(
      "SELECT id FROM pedidos WHERE status = 0 AND user_id = ? LIMIT 1",
      [user_id]
    );

    if (rows.length > 0) {
      pedidoId = rows[0].id;
    } else {
      const [result] = await conection.query(
        "INSERT INTO pedidos (status, user_id) VALUES (0, ?)",
        [user_id]
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
    const userId = req.userId;
    const [rows] = await conection.query(
      `
      SELECT itens_pedidos.* 
      FROM itens_pedidos 
      JOIN pedidos ON itens_pedidos.pedido_id = pedidos.id 
      WHERE pedidos.status = 0 AND pedidos.user_id = ?
    `,
      [userId]
    );
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

async function deleteProduto(req, res) {
  const { id } = req.params;
  try {
    const [result] = await conection.query(
      "DELETE FROM produtos WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(202).json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar o produto", err });
  }
}

async function getHistorico(req, res) {
  try {
    const userId = req.userId;
    const [rows] = await conection.query(
      `
      SELECT itens_pedidos.*, pedidos.dt_pedido, pedidos.status 
      FROM itens_pedidos 
      JOIN pedidos ON itens_pedidos.pedido_id = pedidos.id 
      WHERE pedidos.status = 1 AND pedidos.user_id = ?
    `,
      [userId]
    );
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

async function getUserById(req, res) {
  const user_id = req.userId;
  try {
    const [rows] = await conection.query(
      "SELECT nome, email, created_at FROM users WHERE id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateItem(req, res) {
  const { id } = req.params;
  const { nome, valor, descricao, categoria } = req.body;

  try {
    if (req.file) {
      const [result] = await conection.query(
        "UPDATE produtos SET nome = ?, valor = ?, descricao = ?, imagem = ?, categoria = ? WHERE id = ?",
        [nome, valor, descricao, req.file.buffer, categoria, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Erro ao atualizar o pedido" });
      }

      res.status(200).json({ message: "Item atualizado no banco de dados" });
    } else {
      const [result] = await conection.query(
        "UPDATE produtos SET nome = ?, valor = ?, descricao = ?, categoria = ? WHERE id = ?",
        [nome, valor, descricao, categoria, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Erro ao atualizar o pedido" });
      }

      res.status(200).json({ message: "Item atualizado no banco de dados" });
    }
  } catch (err) {
    console.error("ERRO NO UPDATE:", err);
    res.status(500).json(err);
  }
}

async function adiconarNovoProduto(req, res) {
  const { nome, valor, descricao, categoria } = req.body;

  try {
    const [result] = await conection.query(
      "INSERT INTO produtos (nome, valor, descricao, imagem, categoria) VALUES (?, ?, ?, ?, ?)",
      [nome, valor, descricao, req.file.buffer, categoria]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Erro ao atualizar o pedido" });
    }

    res.status(200).json({ message: "Item adicionado no banco de dados" });
  } catch (err) {
    console.error("ERRO NO POST DO PRODUTO:", err);
    res.status(500).json(err);
  }
}

async function updateType(req, res) {
  const { id } = req.params;
  const tipo = req.body.tipo;

  try {
    const [result] = await conection.query(
      "UPDATE produtos SET tipo = ? WHERE id = ?",
      [tipo, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Erro ao atualizar o tipo do pedido" });
    }

    res.status(200).json({ message: "Item atualizado no banco de dados" });
  } catch (err) {
    console.error("ERRO NO UPDATE:", err);
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
};
