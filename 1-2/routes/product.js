const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const productList = require("../db/products-data.json");

//************** Read All Products */
router.get("/get-all-products", (req, res) => {
  return res.json(products);
});

//************* Read chosen Product  */
router.get("/get-product-id/:id", (req, res) => {
  const product = productList.find((x) => x.id == req.params.id);
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
  productList.push(newProduct);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(productList)
    );
  } catch (err) {
    return res.status(400).send("somthing went wrong");
  }
  res.json(productList);
});

//********* Update Chosen Product */
router.put("/update-products/:id", (req, res) => {
  const product = productList.find((x) => x.id == req.params.id);
  product.price = req.body.price;
  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(product)
    );
  } catch (err) {
    return res.status(400).send("somthing went wrong");
  }
  res.json(productList);
});

//********** Delete Chosen Product */
router.delete("/deleteProducts", (req, res) => {
  const chosen = products.filter((x) => x.id != req.params.productId);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/product.json"),
      JSON.stringify(chosen)
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send("Try again later!");
  }

  res.status(200).send("remove product");
});

module.exports = router;
