const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Password@123",
  database: "zuciball",
});

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
    return db.query(`
     CREATE TABLE IF NOT EXISTS user_access_level (
       id SERIAL PRIMARY KEY,
       value VARCHAR(255) UNIQUE
     );
   `);
  })
  .then(() => {
    console.log("Table 'user_access_level' created or already exists");

    return db.query(`
     INSERT INTO user_access_level (value) VALUES 
     ('Super Admin'),
     ('Area Admin'),
     ('User'),
     ('Coach')
     ON CONFLICT DO NOTHING;
   `);
  })
  .then(() => {
    console.log("Default values inserted into 'user_access_level' table");


    return db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(20),
      lastName VARCHAR(20),
      email VARCHAR(100),
      password TEXT,
      phoneNumber VARCHAR(30),
      jobTitle VARCHAR(50),
      accessLevel INT REFERENCES user_access_level(id),
      areaAccess VARCHAR(100),
      status VARCHAR(20) DEFAULT 'active' 
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
