const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");
const cart = require("./routes/api/carts");
const user = require("./routes/api/user");

const cookieParser = require("cookie-parser");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using static folder to load images
app.use(
  express.static(path.join(__dirname, "./uploads"), { maxAge: 86400000 })
);

//cookie parser
app.use(cookieParser());

//DB config
const DB = require("./config/keys").mongoURI;

//connect to DB
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(DB)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));
} else {
  console.log("testing");
}

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
