import mysql from "mysql2";

function conectDatabase() {
  return mysql
    .createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise();
}

export default conectDatabase;
