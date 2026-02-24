const express = require("express");
require("dotenv").config();
const db = require("./utils/db-connection");
require("./models/associations");
const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Homepage</h1>`);
});

db.sync({ alter: true })
  .then(() => {
    console.log("Models attached to db are synced");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log("SERVER IS RUNNING ON PORT 3000");
});
