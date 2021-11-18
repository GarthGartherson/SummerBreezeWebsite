const User = require("../models/user");
const Order = require("../models/order");
const Cart = require("../models/cart");
const catchAsync = require("../utils/catchAsync");

module.exports.renderRegister = (req, res) => {
  res.render("user/register");
};

module.exports.renderAllOrders = catchAsync(async (req, res, next) => {
  const foundOrders = await Order.find({});
  foundOrders.forEach(function (order) {
    cart = new Cart(order.cart);
    order.items = cart.generateArray();
  });
  res.render("user/checkOrders", { orders: foundOrders });
});

module.exports.register = async (req, res) => {
  try {
    const { email, username, password, adminCode } = req.body;
    const newUser = new User({ email, username });
    if (adminCode === process.env.ADMIN_KEY) {
      newUser.role = "admin";
    }
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });
    req.flash("success", "Welcome to the family");
    res.redirect("/products");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/user/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("user/login");
};

module.exports.renderProfile = catchAsync(async (req, res, next) => {
  const foundOrders = await Order.find({ user: req.user }).populate();
  foundOrders.forEach(async function (order) {
    cart = new Cart(order.cart);
    order.items = cart.generateArray();
  });
  res.render("user/profile", { orders: foundOrders });
});

module.exports.login = catchAsync(async (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/products";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

module.exports.completeOrder = catchAsync(async (req, res, next) => {
  const foundOrder = await Order.findById(req.params.id);
  foundOrder.complete = !foundOrder.complete;
  foundOrder.save();
  res.redirect("/user/checkOrders");
});

module.exports.logout = (req, res) => {
  req.logOut();
  req.session.cart = "";
  req.flash("success", "Logged Out");
  res.redirect("/products");
};
