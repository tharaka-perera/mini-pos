const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

// https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0

const CartsController = require("../controllers/carts");

router.get("/:id", checkAuth, CartsController.get_carts);

router.post("/", checkAuth, CartsController.edit_carts);

router.post("/confirm", checkAuth, CartsController.confirm_cart);

router.delete("/:id", checkAuth, CartsController.delete_cart);

module.exports = router;
