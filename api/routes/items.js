const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UploadMiddleware = require("../middleware/image_uploader");

const ItemsController = require("../controllers/items");

router.get("/", checkAuth, ItemsController.get_items);

router.post(
	"/",
	checkAuth,
	UploadMiddleware.imageUploader(),
	ItemsController.add_item
);

router.delete("/:id", checkAuth, ItemsController.delete_item);

module.exports = router;
