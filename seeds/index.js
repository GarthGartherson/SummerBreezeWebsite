const mongoose = require("mongoose");
const { descriptors, articles, descriptions } = require("./seedAdjectives");
const Product = require("../models/products");

mongoose.connect("mongodb://localhost:27017/summer-breeze", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Product.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random30 = Math.floor(Math.random() * 30);
    const newProduct = new Product({
      title: `${sample(descriptors)} ${sample(articles)}`,
      price: `${random30}`,
      image: `https://source.unsplash.com/1600x900/?ring,necklace`,
      author: "61017fb6cd21df5d90368c08",
      colors: ["Red", "Blue", "Green"],
      images: [
        {
          url: "https://res.cloudinary.com/dhfzvrfor/image/upload/v1627578028/SummerBreeze/qbl5edb38v65xaullp9p.jpg",
          filename: "SummerBreeze/qbl5edb38v65xaullp9p",
        },
        {
          url: "https://res.cloudinary.com/dhfzvrfor/image/upload/v1627583374/SummerBreeze/hiyupmblmjv17xhujxw7.jpg",
          filename: "SummerBreeze/hiyupmblmjv17xhujxw7",
        },
      ],
    });
    newProduct.category = newProduct.title.split(" ")[1];
    newProduct.description = `${sample(descriptions)}`;
    await newProduct.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
