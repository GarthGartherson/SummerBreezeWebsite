const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, checkRole } = require("../middleware");
const user = require("../controllers/users");
const passport = require("passport");

router.get("/register", user.renderRegister);

router.post("/register", catchAsync(user.register));

router.get("/login", user.renderLogin);

router.get(
  "/checkOrders",
  isLoggedIn,
  checkRole("admin"),
  user.renderAllOrders
);

router.get(
  "/completeOrder/:id",
  isLoggedIn,
  checkRole("admin"),
  user.completeOrder
);

router.get("/profile", isLoggedIn, user.renderProfile);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user/login",
  }),
  user.login
);

router.get("/logout", user.logout);

module.exports = router;
