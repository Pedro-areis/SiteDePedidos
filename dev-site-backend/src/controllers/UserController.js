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
  const consultaPedido = "INSERT INTO pedidos () VALUES ()";
  const consultaItem =
    "INSERT INTO itens_pedidos (pedido_id, produto, quant_produto, valor_unitario) VALUES (?, ?, ?, ?)";

  try {
    const pedidoId = await new Promise((resolve, reject) => {
      conection.query(consultaPedido, [], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });

    for (const item of itens) {
      await new Promise((resolve, reject) => {
        conection.execute(
          consultaItem,
          [pedidoId, item.nome, item.quantidade, item.valor_unitario],
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    }

    res
      .status(201)
      .json({ message: "Todos os itens foram inseridos com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir itens" });
  }
}

export { getProdutos, getImagem, postPedidos };
