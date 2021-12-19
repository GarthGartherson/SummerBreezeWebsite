const { productSchema, shippingSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Product = require("./models/products");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Please login");
    return res.redirect("/user/login");
  }
  next();
};

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateShipping = (req, res, next) => {
  const { error } = shippingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    res.redirect(`/products/${id}`);
  }
  next();
};

module.exports.checkRole = function checkAdmin(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      req.flash("error", "You are not an admin");
      res.redirect("/");
    }

    next();
  };
};

module.exports.checkCart = function checkCart(cart) {
  if (cart.items.length === 0) {
    req.flash("error", "No items in Cart");
    res.redirect("/");
  }
  next();
};
