const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const items = require("./routes/api/items");
const cart = require("./routes/api/carts");
const user = require("./routes/api/user");

const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using static folder to load images
app.use(express.static("uploads"));

//cookie parser
app.use(cookieParser());

//DB config
const DB = require("./config/keys").mongoURI;

//connect to DB

mongoose
  .connect(DB)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//Use routes
app.use("/api/items", items);
app.use("/api/cart", cart);
app.use("/api/user", user);

//serve static asset if in production
if (process.env.NODE_ENV === "production") {
  //set the static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
