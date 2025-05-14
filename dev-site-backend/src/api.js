// GET - Pegar infomrações
// POST - Criar informações
// PUT / PATCH - Alterar informações
// DELETE - Deletar informações

import express from "express";
import conectDatabase from "./database/db.js";
import routes from "./routes.js";
import cors from "cors";

const app = express(); //cria a variavel para chamar o express;

app.use(cors());
app.use(express.json()); //app irá reconhecer json;

app.use(routes);

conectDatabase();
app.listen(3000, () => {
  console.log(`Server rodando`);
});
