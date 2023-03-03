const express = require("express");
const router = express.Router();
const data = require("../db/users-data.json");
const path = require("path");
const fs = require("fs");

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

router.post("/signup", (req, res) => {
  let newUser = req.body;
  data.push(newUser);
  fs.writeFileSync(
    path.join(__dirname, "../db/users-data.json"),
    JSON.stringify(data)
  );
  res.send(data);
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post("/login", (req, res) => {
  let newUserUsername = data.find((x) => x.username == req.body.username);
  let newUserPassword = data.find((x) => x.password == req.body.password);
  if (!newUserUsername) {
    return res.send("user not found");
  }
  if (!newUserPassword) {
    return res.send("password is wrong");
  } else {
    res.send("ok");
  }
});
module.exports = router;
