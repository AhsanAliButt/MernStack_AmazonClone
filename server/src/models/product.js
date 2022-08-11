const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // user id
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    reviewsAverage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.calculateAverageRating = function () {
  const { reviews } = this;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  this.reviewsAverage = sum / reviews.length;
};

productSchema.pre("save", function () {
  this.calculateAverageRating();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
