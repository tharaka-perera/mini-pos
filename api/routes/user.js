const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const User_Controller = require("../controllers/user");

router.get("/auth", checkAuth, User_Controller.check_authentication);

router.post("/signup", User_Controller.user_signup);

router.post("/login", User_Controller.user_login);

router.post("/logout", checkAuth, User_Controller.user_logout);

router.delete("/:userId", checkAuth, User_Controller.user_delete);

router.post("/cartlist", checkAuth, User_Controller.get_cartlist);

router.post("/addcart", checkAuth, User_Controller.add_cart);

router.post("/removecart", checkAuth, User_Controller.remove_cart);

module.exports = router;
