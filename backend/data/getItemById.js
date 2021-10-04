const Item = require("../models/Item");

module.exports = async function getItemById(id) {
  const itemDB = await Item.findById(id);
  return itemDB;
};
