const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CategoriesSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
  },
});

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
