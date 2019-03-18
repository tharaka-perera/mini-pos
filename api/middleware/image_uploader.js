const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/items/");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.productCode);
  }
});
const upload = multer({ storage: storage });

exports.imageUploader = (req, res, next) => {
  // next();
  try {
    return upload.single("itemImage");
  } catch (error) {
    return res.status(500).json({
      message: false
    });
  }
};
