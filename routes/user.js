const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await User.find({}, "email age salary isAdmin"));
});
router.post("/search", async (req, res) => {
  const { select, filter, paginate, sort } = req.body;
  //select => string[] ex ["email", "age", "salary"]
  //filter => object{}[] ex [{email: andrewnagyenmr@gamil.com}]
  //filter => object{}[] ex [{age: {$lte:20}}]
  res.json(await User.find({}, "email age salary isAdmin"));
});

module.exports = router;
