const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  confirmed: { type: Boolean },
  items: [
    {
      itm: {
        type: Schema.Types.ObjectId,
        ref: "Item"
      },
      count: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model("Cart", CartSchema);
