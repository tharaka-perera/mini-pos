const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/items/");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.productCode);
  }
});
const upload = multer({ storage: storage });
//Item Model

const Item = require("../../models/Item");

router.get("/", checkAuth, (req, res) => {
  Item.find()
    .sort({ productCode: 1 })
    .then(items => res.json(items));
});

router.post("/", checkAuth, upload.single("itemImage"), (req, res) => {
  const newItem = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    productCode: req.body.productCode,
    price: req.body.price,
    description: req.body.description,
    availableCount: req.body.availableCount
  });

  newItem.save().then(item => res.json(item));
});

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
