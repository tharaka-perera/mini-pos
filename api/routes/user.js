const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

router.get("/auth", checkAuth, UserController.check_authentication);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/logout", checkAuth, UserController.user_logout);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.post("/cartlist", checkAuth, UserController.get_cartlist);

router.post("/addcart", checkAuth, UserController.add_cart);

router.post("/removecart", checkAuth, UserController.remove_cart);

module.exports = router;
