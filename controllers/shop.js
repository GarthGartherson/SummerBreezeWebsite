const express = require("express");
const Product = require("../models/products");
const Cart = require("../models/cart");
const Order = require("../models/order");
const sendMail = require("../public/javascripts/mail.js");

module.exports.renderShoppingCart = async function (req, res, next) {
  if (!req.session.cart) {
    return res.render("shop/shoppingCart", { products: null });
  }
  const cart = new Cart(req.session.cart);

  res.render("shop/shoppingCart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
};

module.exports.addToCart = async function (req, res, next) {
  const { color } = req.body;
  const productId = req.params.id;
  const cart = new Cart(req.session.cart);
  const foundProduct = await Product.findById(productId);

  if (foundProduct) {
    cart.addItem(foundProduct, foundProduct.id, color);
    req.session.cart = cart;
    res.redirect("/");
  }
};

module.exports.addToCartDirect = async function (req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart);
  const foundProduct = await Product.findById(productId);
  console.log(foundProduct);
  if (foundProduct) {
    cart.addItem(foundProduct, foundProduct.id);
    req.session.cart = cart;
    res.redirect("/shop/shoppingCart");
  }
};

module.exports.removeFromCart = async function (req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart);
  const foundProduct = await Product.findById(productId);

  if (foundProduct) {
    cart.removeItem(foundProduct, foundProduct.id);
    req.session.cart = cart;
    res.redirect("/shop/shoppingCart");
  }
};

module.exports.renderShipping = function (req, res, next) {
  if (!req.session.cart) {
    req.flash("error", "Your shopping Cart is empty");
    res.redirect("shop/shoppingCart");
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/shipping", { total: cart.totalPrice });
};

module.exports.createOrder = async function (req, res, next) {
  const cart = new Cart(req.session.cart);

  console.log(req.body);

  const order = new Order({
    user: req.user,
    cart: cart,
    name: req.body.firstName,
    date: Date.now(),
    complete: false,
    address: {
      firstName: req.body.firstName,
      instagram: req.body.instagram,
      phoneNumber: req.body.number,
      address: req.body.address,
      zipCode: req.body.zipCode,
      subdistrict: req.body.subdistrict,
      district: req.body.district,
      province: req.body.province,
      country: req.body.country,
    },
  });

  const email = req.user.email;
  const arrayCart = cart.generateArray();

  const emailObject = {
    orderId: order._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,

    address: req.body.address,
    zipCode: req.body.zipCode,
    subdistrict: req.body.subdistrict,
    district: req.body.district,
    province: req.body.province,
    country: req.body.country,

    instagram: req.body.instagram,
    totalPrice: order.cart.totalPrice,
    totalQuantity: order.cart.totalQuantity,
  };

  await order.save();
  sendMail(
    email,
    `Order Confirmation for ${order.instagram}`,
    arrayCart,
    emailObject
  );
  req.flash("success", "Your order has been placed!");
  req.session.cart = "";
  res.redirect("/");
};
