const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Password@123",
  database: "postgres",
});

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");

    return db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(20),
      lastName VARCHAR(20),
      emailId VARCHAR(100),
      password TEXT,
      phoneNumber VARCHAR(30),
      jobTitle VARCHAR(50),
      accessLevel VARCHAR(50)
    );
    `);
  })
  .then(() => {
    console.log("Table 'users' created or already exists");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err);
  });

module.exports = db;
