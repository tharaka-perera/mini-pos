const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const CartsController = require("../controllers/carts");

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/cart/getCart
 */

router.get("/:id", checkAuth, CartsController.get_carts);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/cart/createCart
 */

router.post("/", checkAuth, CartsController.edit_carts);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/cart/confirmCart
 */

router.post("/confirm", checkAuth, CartsController.confirm_cart);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/cart/deleteCart
 */

router.delete("/:id", checkAuth, CartsController.delete_cart);

module.exports = router;
