const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateProduct,
  checkRole,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(products.index))
  .post(
    isLoggedIn,
    checkRole("admin"),
    upload.array("image"),
    validateProduct,
    catchAsync(products.createProduct)
  );

router.get("/earrings", products.renderEarrings);
router.get("/anklets", products.renderAnklets);
router.get("/shirts", products.renderShirts);
router.get("/bracelets", products.renderBracelets);
router.get("/necklaces", products.renderNecklaces);

router.get(
  "/new",
  isLoggedIn,
  checkRole("admin"),
  catchAsync(products.renderNewForm)
);

router
  .route("/:id")
  .get(catchAsync(products.showProduct))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateProduct,
    catchAsync(products.updateProduct)
  )
  .delete(
    isLoggedIn,
    isAuthor,
    checkRole("admin"),
    catchAsync(products.deleteProduct)
  );

//prettier-ignore
router.get("/:id/edit",isLoggedIn,isAuthor,catchAsync(products.renderEditForm)
);

module.exports = router;
