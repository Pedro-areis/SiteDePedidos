import conectDatabase from "../database/db.js";
import fs from "fs/promises";

const conection = conectDatabase();

//função para inserir um produto no banco de dados
async function inserirProduto() {
  const imagemData = await fs.readFile(
    "src/assets/img-prato-frango-com-quiabo.png"
  );
  const consulta = "UPDATE produtos SET imagem = ? WHERE id = 4;";

  const imagem = imagemData;

  conection.execute(consulta, [imagem], (err, data) => {
    if (err) return console.log(err);
    console.log("Produto alterado com sucesso:", data);
  });
}

inserirProduto();
