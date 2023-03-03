const express = require("express");
const router = express.Router();
const data = require("../db/users-data.json");
const path = require("path");
const fs = require("fs");

router.get("/get-all-users", (req, res) => {
  res.send(data);
});

router.get("/get-user/:username", (req, res) => {
  let chosenUser = data.find((x) => x.username == req.params.username);

  if (!chosenUser) return res.send("User Not Found");
  else res.send(chosenUser);
});

router.delete("/remove-user/:username", (req, res) => {
  let removedUser = data.filter((user) => user.username != req.params.username);
  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/users-data.json"),
      JSON.stringify(removedUser)
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send("Somthing Went Wrong!!");
  }
  res.status(200).send(data);
});

module.exports = router;
