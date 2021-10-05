const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SK);
const getOrderAmount = require("../data/getOrderAmount");

//Crear intento de pago
router.post("/", async (req, res) => {
  const items = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await getOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
