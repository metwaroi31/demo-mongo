require('dotenv').config();
const express = require("express");

const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const videoRoutes = require("./s3_demo/router");

app.use("/api", videoRoutes);

console.log(process.env.DATABASE)
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true //make this also true
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(err => {
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`));
app.get("/h", (req, res) => {
  res.send("Successful response.");
});

app.use("/", router);
