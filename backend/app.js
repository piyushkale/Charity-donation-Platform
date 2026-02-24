const express = require("express");
require("dotenv").config();
const db = require("./utils/db-connection");
require("./models/associations");
const indexRoute = require("./routes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Homepage</h1>`);
});

app.use("/api", indexRoute);

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
