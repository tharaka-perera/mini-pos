const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/authUser
 */

router.get("/auth", checkAuth, UserController.check_authentication);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/signupUser
 */

router.post("/signup", UserController.user_signup);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/loginUser
 */

router.post("/login", UserController.user_login);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/logoutUser
 */

router.post("/logout", checkAuth, UserController.user_logout);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/deleteUser
 */

router.delete("/:userId", checkAuth, UserController.user_delete);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/cartlistUser
 */

router.post("/cartlist", checkAuth, UserController.get_cartlist);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/items/getItems
 */

router.post("/addcart", checkAuth, UserController.add_cart);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/user/removeCart
 */

router.post("/removecart", checkAuth, UserController.remove_cart);

module.exports = router;
