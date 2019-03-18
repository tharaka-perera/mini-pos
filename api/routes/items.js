const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UploadMiddleware = require("../middleware/image_uploader");

const Items_Controller = require("../controllers/items");

router.get("/", checkAuth, Items_Controller.get_items);

router.post(
  "/",
  checkAuth,
  UploadMiddleware.imageUploader(),
  Items_Controller.add_item
);

router.delete("/:id", checkAuth, Items_Controller.delete_item);

module.exports = router;
