const Product = require("../models/products");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const products = await Product.find();
  const productCategory = "All Product";
  res.render("products/index", { products, productCategory });
};

module.exports.renderBracelets = async (req, res) => {
  const products = await Product.find({ category: "Bracelet" });
  const productCategory = "Bracelet";
  res.render("products/index", { products, productCategory });
};
module.exports.renderAnklets = async (req, res) => {
  const products = await Product.find({ category: "Anklet" });
  const productCategory = "Anklet";
  res.render("products/index", { products, productCategory });
};
module.exports.renderEarrings = async (req, res) => {
  const products = await Product.find({ category: "Earring" });
  const productCategory = "Earring";
  res.render("products/index", { products, productCategory });
};
module.exports.renderShirts = async (req, res) => {
  const products = await Product.find({ category: "Shirt" });
  const productCategory = "Shirt";
  res.render("products/index", { products, productCategory });
};
module.exports.renderNecklaces = async (req, res) => {
  const products = await Product.find({ category: "Necklace" });
  const productCategory = "Necklace";
  res.render("products/index", { products, productCategory });
};

module.exports.renderNewForm = (req, res) => {
  res.render("products/new");
};

module.exports.createProduct = async (req, res) => {
  // req.body here will be products : { bunch of stuff}
  // if(!req.body.product) throw new ExpressError('Invalid Product Data', 400  )
  const product = new Product(req.body.product);
  product.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  product.author = req.user._id;
  await product.save();
  req.flash("success", "Successfully made a new product!");
  res.redirect(`/products/${product._id}`);
};

module.exports.showProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    req.flash("error", "Sorry, cannot find that product.");
    return res.redirect("/products");
  }
  const randomProducts = await Product.aggregate([{ $sample: { size: 4 } }]);
  res.render("products/show", { product, randomProducts });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    req.flash("error", "Cannot find that product");
    return res.redirect("/products");
  }
  res.render("products/edit", { product });
};

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  product.images.push(...imgs);
  await product.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await product.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully updated a product!");
  res.redirect(`/products/${product._id}`);
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a product!");
  res.redirect("/products");
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Logged Out");
  res.redirect("/products");
};
