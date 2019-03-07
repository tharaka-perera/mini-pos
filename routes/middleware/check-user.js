const User = require("../../models/User");

module.exports = (req, res, next) => {
  let userID = req.params.id || req.body._id;
  User.findOne({ email: req.userData.email }).then(user => {
    let allowed = false;
    for (let i of user.orders) {
      if (i.cartId == userID) {
        allowed = true;
      }
    }
    if (allowed) {
      next();
    } else {
      res.status(403).json({ success: false });
    }
  });
};
