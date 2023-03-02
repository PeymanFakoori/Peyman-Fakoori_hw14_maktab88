const express = require("express");
const app = express();
const productRouter = require("./routes/product");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/product", productRouter);

app.listen(8000);
