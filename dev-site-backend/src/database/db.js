import mysql from "mysql2";

function conectDatabase() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "P1d5c9w@",
    database: "sitepedidos",
  });
}

export default conectDatabase;
