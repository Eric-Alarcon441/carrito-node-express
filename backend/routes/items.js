const express = require("express");
const router = express.Router();

const getItemById = require("../data/getItemById");

//Models
const Item = require("../models/Item");

// get items
router.get("/", async (req, res) => {
  try {
    const itemsDB = await Item.find();
    res.json(itemsDB);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get item

router.get("/item", async (req, res) => {
  const itemId = req.body.itemId;
  try {
    const itemDB = await getItemById(itemId);
    res.json(itemDB);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// create items
router.post("/", async (req, res) => {
  console.log(req.body);
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
  });

  try {
    const newItem = await item.save();
    res.json(newItem);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
