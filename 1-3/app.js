const express = require("express");
const app = express();
const authAouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authAouter);
app.use("/admin", adminRouter);

app.listen(8000);
