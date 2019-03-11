const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String
  },
  productCode: {
    type: Number
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  availableCount: {
    type: Number
  }
});

module.exports = mongoose.model("Item", ItemSchema);
