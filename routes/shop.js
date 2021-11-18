const express = require("express");
const router = express.Router();
const { isLoggedIn, validateShipping } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const shop = require("../controllers/shop");

router.get("/shoppingCart", catchAsync(shop.renderShoppingCart));

router.get("/about", function (req, res, next) {
  res.render("shop/about.ejs");
});

router.get("/add-to-cart-direct/:id", catchAsync(shop.addToCartDirect));

router.get("/remove-from-cart/:id", catchAsync(shop.removeFromCart));

router.get("/add-to-cart/:id", catchAsync(shop.addToCart));

router.get("/shipping", isLoggedIn, shop.renderShipping);

router.post(
  "/shipping",
  isLoggedIn,
  validateShipping,
  catchAsync(shop.createOrder)
);

module.exports = router;
