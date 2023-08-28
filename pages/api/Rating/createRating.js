import getUser from "@/lib/getUser";
import productModel from "@/models/product/productModel";
import Rating from "@/models/user/ratingModel";
import Order from "@/models/user/userOrder";

export default async function handler(req, res) {
  try {
    req.user = await getUser(req.headers.id);
    switch (req.method) {
      case "GET":
        const { productId } = req.query;
        const rating = await Rating.findOne({
          product: productId,
          user: req.user._id,
        });
        res.json({
          status: "success",
          message: "Rating has been fetched successfully",
          rating: rating.value,
        });
        break;
      case "POST":
        const value = req.body.value * 1;
        const order = await Order.findById(req.body.order);
        console.log(order.customizedAmount);
        const product = await productModel.findById(req.body.product);
        const checkOldRating = await Rating.findOne({
          user: req.headers.id,
          product: req.body.product,
        });

        if (checkOldRating) {
          const ratingData = await Rating.find({
            product: req.body.product,
          });

          let totalRatingValue = 0;
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
              user: req.headers.id,
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
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
