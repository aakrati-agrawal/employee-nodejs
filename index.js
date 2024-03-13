const express = require("express");
const mysql = require("mysql");


// Create connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    //port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
  
// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});


const app = express();


// Create DB
app.post("/createdb", (req, res) => {
    let sql = "CREATE DATABASE empmysql;";
    db.query(sql, (err) => {
        if (err) {
            resp = err.message;
          } else{
            resp = `Database created`;
          }
          res.send(resp);
    });
  });


// Create table
app.post("/createtable", (req, res) => {
    let sql =
      "CREATE TABLE empmysql.employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err) => {
        if (err) {
            resp = err.message;
          } else{
            resp = `Employee table created`;
          }
          res.status(201).send(resp);
    });
  });


// Insert employee\
app.post("/employee/:id", (req, res) => {
    let post = { id: `${req.params.id}`, name: `Jake Smith${req.params.id}`, designation: "Chief Executive Officer" };
    let sql = "INSERT INTO empmysql.employee SET ?";
    let query = db.query(sql, post, (err) => {
        if (err) {
            resp = err.message;
          } else{
            resp = `Employee ${req.params.id} added`;
          }
          res.status(201).send(resp);
    });
  });


// get employee\
app.get("/employee", (req, res) => {
    let sql = "SELECT * FROM empmysql.employee";
    let query = db.query(sql, (err, result, fields) => {
        if (err) {
            resp = err.message;
          } else{
            resp = result;
          }
          res.send(resp);
    });
  });


// Update employee
app.put("/employee/:id/:updated_name", (req, res) => {
    let sql = `UPDATE empmysql.employee SET name = '${req.params.updated_name}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err) => {
        if (err) {
            resp = err.message;
          } else{
            resp = `Employee ${req.params.id} updated`;
          }
          res.send(resp);
    });
  });


// Delete employee
app.delete("/employee/:id", (req, res) => {
    let sql = `DELETE FROM empmysql.employee WHERE id = ${req.params.id}`;
    let resp;
    let query = db.query(sql, (err) => {
      if (err) {
        resp = err.message;
      } else{
        resp = `Employee ${req.params.id} deleted`;
      }
      res.send(resp);
    });
  });  


  app.listen("3000", () => {
    console.log("Server started on port 3000");
  });