const User = require("../../models/User");
const Cart = require("../../models/Cart");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKEY = require("../../config/keys").jwtKEY;

exports.check_authentication = (req, res) => {
  res.json({ message: true });
};

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              carts: []
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            jwtKEY,
            {
              expiresIn: "1h"
            }
          );
          return res
            .cookie("token", token, { httpOnly: true })
            .cookie("user", user[0]._id)
            .status(200)
            .json({ userId: user[0]._id });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_logout = (req, res, next) => {
  res.clearCookie("token").sendStatus(200);
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_cartlist = (req, res, next) => {
  User.findOne({ _id: req.body.userId })
    .populate({
      path: "carts",
      populate: { path: "items.itm" }
    })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        });
      }
      res.json({ _id: user._id, carts: user.carts });
    })
    .catch(err => {
      console.log("HI", err);
      res.status(500).json({
        error: err
      });
    });
};

exports.add_cart = (req, res, next) => {
  User.findOne({ _id: req.body.userId })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        });
      }
      user.carts.push(req.body.cart);
      user.save().then(res.status(200).json({ success: true }));
    })
    .catch(err => {
      console.log("Add cart", err);
      res.status(500).json({
        error: err
      });
    });
};

exports.remove_cart = (req, res, next) => {
  User.findById(req.body._id, function(err, user) {
    if (err) {
      console.log(err);
      res.status(404).json({ success: false });
      return;
    } else {
      User.updateOne(
        { _id: req.body._id },
        {
          $pull: {
            carts: req.body.cart
          }
        },
        function(err, mod) {
          if (err) {
            res.json({ success: false });
          } else {
            Cart.findByIdAndDelete(req.body.cart, function(err, cart) {
              if (err) {
                console.log(err);
                res.status(404).json({ success: false });
                return;
              } else {
                res.status(200).json({ success: true });
              }
            });
          }
        }
      );
    }
  });
};
