const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
//BD
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conectado a la BD"));

// import routes
const itemsRoutes = require("./routes/items");
const imgRoutes = require("./routes/img");

//middleware
app.use(cors());
app.use(express.json());

app.use("/items", itemsRoutes);
app.use("/img", imgRoutes);

//Rutas
app.get("/", (req, res) => {
  res.send("HOME!");
});

//start
app.listen(3000);
