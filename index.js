require("express-async-errors");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("successfully connected to database");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((e) => console.log(e.message));

//middleware
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));

app.use(auth);

app.get("/", (req, res) => {
  console.log(req.user);
  if (!req.user.isAdmin) 
//   return res.status(401).json({ message: "must be admin" });
  res.json({ message: "hello-world" });
});

//Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
