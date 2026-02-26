const express = require("express");
require("dotenv").config();
const db = require("./utils/db-connection");

const path = require("path");
const indexRoute = require("./routes");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));
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
