const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

// https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0

const Carts_Controller = require("../controllers/carts");

router.get("/:id", checkAuth, Carts_Controller.get_carts);

router.post("/", checkAuth, Carts_Controller.edit_carts);

router.post("/confirm", checkAuth, Carts_Controller.confirm_cart);

router.delete("/:id", checkAuth, Carts_Controller.delete_cart);

module.exports = router;
