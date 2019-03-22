const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UploadMiddleware = require("../middleware/image_uploader");

const ItemsController = require("../controllers/items");

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/items/getItems
 */

router.get("/", checkAuth, ItemsController.get_items);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/items/addItem
 */

router.post(
  "/",
  checkAuth,
  UploadMiddleware.imageUploader(),
  ItemsController.add_item
);

/**
 * Documentation available on
 * https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0#/items/deleteItem
 */

router.delete("/:id", checkAuth, ItemsController.delete_item);

module.exports = router;
