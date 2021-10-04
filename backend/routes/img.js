const express = require("express");
const router = express.Router();

const path = require("path");

//Image path
const imgFolderPath = path.join(__dirname, "../img/");

router.get("/:imgName", (req, res) => {
  const image = req.params.imgName;
  res.sendFile(`${imgFolderPath}${image}`);
});

module.exports = router;
