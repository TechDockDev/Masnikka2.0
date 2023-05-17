const Product = require("../../models/product/productModel");
const Rating = require("./../../models/user/ratingModel");
const Order = require("./../../models/user/userOrder");
exports.createRating = async (req, res) => {
  try {
    console.log(req.body);
    const value = req.body.value * 1;
    const order = await Order.findById(req.body.order);
    console.log(order.customizedAmount);
    const product = await Product.findById(req.body.product);
    const checkOldRating = await Rating.findOne({
      user: req.user._id,
      product: req.body.product,
    });

    if (checkOldRating) {
      const ratingData = await Rating.find({
        product: req.body.product,
      });

      totalRatingValue = 0;
      for (let index = 0; index < ratingData.length; index++) {
        const element = ratingData[index];
        totalRatingValue = totalRatingValue + element.value;
      }
      product.averageRating = totalRatingValue / ratingData.length;

      checkOldRating.value = value;
      await checkOldRating.save();
      await product.save();
      res.status(201).json({
        status: "success",
        message: "rating update successfully ",
      });
    } else {
      const ratingData = await Rating.find({
        product: req.body.product,
      });
      if (!(ratingData.length === 0)) {
        totalRatingValue = 0;
        for (let index = 0; index < ratingData.length; index++) {
          const element = ratingData[index];
          totalRatingValue = totalRatingValue + element.value;
        }
        product.averageRating = totalRatingValue / ratingData.length;
        const rating = await Rating.create({
          user: req.user._id,
          product: req.body.product,
          value: value,
        });
        order.rating = rating._id;
        console.log("qqq", rating._id);

        await product.save();
        await order.save();
        res.status(201).json({
          status: "success",
          message: "rating created successfully ",
          rating,
        });
      } else {
        const rating = await Rating.create({
          user: req.user._id,
          product: req.body.product,
          value: value,
        });
        order.rating = rating._id;
        console.log("qqq", rating._id);

        product.averageRating = value;
        await product.save();
        await order.save();
        res.status(201).json({
          status: "success",
          message: "rating created successfully.",
          rating,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
