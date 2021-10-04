const express = require("express");
const app = express();

//mock
const itemsMock = require("./mock/items.json");

//middleware
// app.use("/items",);

//Rutas
app.get("/", (req, res) => {
  res.send("HOME!");
});

//items
app.get("/items", (req, res) => {
  res.send(itemsMock);
});

//start
app.listen(3000);
