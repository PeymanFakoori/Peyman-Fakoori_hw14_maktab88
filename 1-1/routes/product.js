const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//************** Read All Products */
router.get("/get-all-products", (req, res) => {
  const products = require("../db/products-data.json");
  return res.json(products);
});

//************* Read chosen Product  */
router.get("/get-product-id/:productId", (req, res) => {
  const products = require("../db/products-data.json");
  const product = products.find((x) => x.id == req.params.productId);
  if (!product) {
    return res.status(404).send("Product Not Found!");
  }
  return res.json(product);
});

//************* Craet New Product */
router.post("/newProduct", (req, res) => {
  const newProduct = {
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    rating: req.body.rating,
    stack: req.body.stack,
    brand: req.body.brand,
    category: req.body.category,
  };
  const products = require("../db/products-data.json");
  products.push(newProduct);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(products)
    );
  } catch (err) {
    return res.status(400).send("somthing went wrong");
  }
  res.json(products);
});

//********* Update Chosen Product */
router.put("/update-products/:productId", (req, res) => {
  const products = require("../db/products-data.json");
  const product = products.find((x) => x.id == req.params.productId);
  product.price = req.body.price;
  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(product)
    );
  } catch (err) {
    return res.status(400).send("somthing went wrong");
  }
  res.json(products);
});

//********** Delete Chosen Product */
router.delete("/deleteProducts", (req, res) => {
  const productsTemp = products.filter((x) => x.id != req.params.productId);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/product.json"),
      JSON.stringify(productsTemp)
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send("Try again later!");
  }

  res.send("remove product");
});
module.exports = router;
