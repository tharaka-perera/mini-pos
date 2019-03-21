const mongoose = require("mongoose");
const Cart = require("../../models/Cart");
const User = require("../../models/User");

exports.get_carts = (req, res) => {
	Cart.findById(req.params.id)
		.populate("items.itm")
		.exec()
		.then(items => res.json(items))
		.catch(err => {
			res.status(404).json({
				error: err
			});
		});
};

exports.edit_carts = (req, res) => {
	if (req.body.hasOwnProperty("delete")) {
		Cart.findById(req.body._id)
			.exec()
			.then(() => {
				Cart.updateOne(
					{ _id: req.body._id, "items.itm": req.body.itm },
					{
						$pull: {
							items: { itm: req.body.itm }
						}
					}
				)
					.exec()
					.then(mod => res.json(mod))
					.catch(err => res.status(500).json({ success: false }));
			})
			.catch(err => {
				/*console.log(err);*/
				res.status(404).json({ success: false });
			});
	} else {
		if (req.body.hasOwnProperty("_id")) {
			Cart.findById(req.body._id)
				.exec()
				.then((cart) => {
					Cart.updateOne(
						{ _id: req.body._id, "items.itm": req.body.itm },
						{
							$set: {
								"items.$.count": req.body.count
							}
						}
					)
						.exec()
						.then(mod => {
							if (mod.n === 0) {
								let pushItm = { itm: req.body.itm, count: req.body.count };
								cart.items.push(pushItm);
								cart.save().then(item => res.json(item));
							} else {
								res.json(mod);
							}
						})
						.catch(err => res.status(500).json({ success: false }));
				}).catch(err => res.status(404).json({ success: false }));
		} else {
			const newCart = new Cart({
				_id: new mongoose.Types.ObjectId(),
				confirmed: false,
				items: []
			});

			newCart.save().then(item => {
				User.findOne({ _id: req.body.userId })
					.exec()
					.then(user => {
						user.carts.push(item._id);
						user.save().then(res.status(201).json(user));
					})
					.catch(err => {
						/*console.log(err);*/
						res.status(500).json({
							error: err
						});
					});
			});
		}
	}
};

exports.confirm_cart = (req, res) => {
	Cart.findByIdAndUpdate(
		req.body._id,
		{ confirmed: req.body.confirmed }
	)
		.exec()
		.then(() => res.status(200).json({ success: true }))
		.catch(err => {
			/*console.log(err);*/
			res.status(404).json({ success: false });
		});
};

exports.delete_cart = (req, res) => {
	Cart.findById(req.params.id)
		.exec()
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(_err => res.status(404).json({ success: false }));
};
