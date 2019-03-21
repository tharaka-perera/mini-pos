const express = require("express");
express.Router();
const mongoose = require("mongoose");

// Item Model

const Item = require("../../models/Item");

exports.get_items = (req, res) => {
  Item.find()
    .sort({ productCode: 1 })
    .exec()
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err }));
};

exports.add_item = (req, res) => {
  const newItem = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    productCode: req.body.productCode,
    price: req.body.price,
    description: req.body.description,
    availableCount: req.body.availableCount
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.status(500).json({ error: err }));
};

exports.delete_item = (req, res) => {
  Item.findById(req.params.id)
    .exec()
    .then(item =>
      item
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }))
    )
    .catch(_err => res.status(404).json({ success: false }));
};
