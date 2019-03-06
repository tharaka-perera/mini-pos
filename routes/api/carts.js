const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const checkAuth = require("../middleware/check-auth");

// Cart Model

const Cart = require("../../models/Cart");
const Item = require("../../models/Item");
const User = require("../../models/User");

router.get("/:id", checkAuth, (req, res) => {
  Cart.findById(req.params.id)
    .populate("items.itm")
    .then(items => res.json(items));
});

router.post("/", (req, res) => {
  if (req.body.hasOwnProperty("delete")) {
    Cart.findById(req.body._id, function(err, cart) {
      if (err) {
        console.log(err);
        res.status(404).json({ success: false });
        return;
      } else {
        Cart.updateOne(
          { _id: req.body._id, "items.itm": req.body.itm },
          {
            $pull: {
              items: { itm: req.body.itm }
            }
          },
          function(err, mod) {
            if (err) {
              res.json({ success: false });
            } else {
              res.json(mod);
            }
          }
        );
      }
    });
  } else {
    if (req.body.hasOwnProperty("_id")) {
      Cart.findById(req.body._id, function(err, cart) {
        if (err) {
          console.log(err);
          return;
        } else {
          Cart.updateOne(
            { _id: req.body._id, "items.itm": req.body.itm },
            {
              $set: {
                "items.$.count": req.body.count
              }
            },
            function(err, mod) {
              if (mod.n === 0) {
                let pushItm = { itm: req.body.itm, count: req.body.count };
                cart.items.push(pushItm);
                cart.save().then(item => res.json(item));
              } else {
                res.json(mod);
              }
            }
          );
        }
      });
    } else {
      const newCart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        confirmed: false,
        items: []
      });

      newCart.save().then(item => {
        User.findOne({ _id: req.body.userId })
          .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "user not found"
              });
            }
            user.carts.push(item._id);
            user.save().then(res.status(200).json(user));
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });
    }
  }
});

router.post("/confirm", (req, res) => {
  Cart.findByIdAndUpdate(
    req.body._id,
    { confirmed: req.body.confirmed },
    function(err, doc) {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false });
        return;
      } else {
        res.status(200).json({ success: true });
      }
    }
  );
});

router.delete("/:id", checkAuth, (req, res) => {
  Cart.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
