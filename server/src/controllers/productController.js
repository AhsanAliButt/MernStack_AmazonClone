const ProductModel = require("../models/product");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cloudinarySecret = process.env.CLOUDNARY_API_SECRET;
cloudinary.config({
  cloud_name: "dbi6jvkot",
  api_key: "268511633691445",
  api_secret: cloudinarySecret,
});
// controllers/paymentController.js
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const paymentModel = require("../models/payment"); // Import your Mongoose model

const ProductsController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json({
        status: "Status Success",
        message: "Products found",
        products: products,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  createProduct: async (req, res) => {
    console.log("Received Information", req.body);
    const file = req.files?.photo;
    console.log("File Object:", file); // Log the file object to verify its contents

    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "productPictures",
      });
      const {
        name,
        description,
        stock,
        price,
        category,
        company,
        brand,
        userId,
      } = req.body;

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !stock ||
        !brand ||
        !company ||
        !userId
      ) {
        return res.status(400).json({
          status: 400,
          message: "Please fill all fields",
        });
      } else {
        const product = new ProductModel({
          user: userId,
          name: name,
          description: description,
          price: price,
          category: category,
          imageUrl: result.url || "", // Use the URL from Cloudinary
          createdAt: Date.now(),
          stock: stock,
          company: company,
          brand: brand,
          keywords: [],
        });
        await product.save();
        res.status(200).json({
          status: 200,
          message: "Product created",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  },
  updateProduct: async (req, res) => {
    console.log("Received Information", req.body);
    const file = req.files?.photo;
    console.log("File Object:", file); // Log the file object to verify its contents

    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "productPictures",
      });
      const { name, description, price, category, company, stock, brand } =
        req.body;
      console.log("NAME", name);
      // update only provided fields
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !brand ||
        !company ||
        !stock
      ) {
        return res.status(400).json({
          status: 400,
          message: "Please fill all fields",
        });
      } else {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
          return res.status(400).json({
            status: 400,
            message: "Product not found",
          });
        } else {
          product.name = name;
          product.description = description;
          product.price = price;
          product.category = category;
          product.imageUrl = result.url;
          product.company = company;
          product.brand = brand;
          product.stock = stock;
          await product.save();
          res.status(200).json({
            status: 200,
            message: "Product updated",
            product: product,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          status: 400,
          message: "Product not found",
        });
      } else {
        await product.remove();
        res.status(200).json({
          status: 200,
          message: "Product Deleted",
          deletedProduct: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      // const product = await ProductModel.findById(req.params.id);
      const product = await ProductModel.findById(
        mongoose.Types.ObjectId(req.params.id)
      );

      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductByName: async (req, res) => {
    try {
      const product = await ProductModel.find({ name: req.params.name });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductByUserId: async (req, res) => {
    try {
      const product = await ProductModel.find({ user: req.params.userId });
      if (!product) {
        return res.status(400).json({
          status: 400,
          message: "Product not found for the user",
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  },
  getProductByCategory: async (req, res) => {
    try {
      const product = await ProductModel.find({
        category: req.params.category,
      });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductsByBrand: async (req, res) => {
    try {
      // const brands = Array.isArray(req.params.brand)
      //   ? req.params.brand
      //   : [req.params.brand];
      const brandParam = req.params.brand; // Get the comma-separated string
      console.log("BrandName in Nodejs", brandParam);

      const brands = brandParam.split(","); // Split the string into an array

      const products = await ProductModel.find({
        brand: { $in: brands.map((brand) => new RegExp(brand, "i")) },
      });

      if (!products || products.length === 0) {
        return res.status(404).json({
          status: "Status Failed",
          message: "Products not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Products found",
          brand: brandParam,
          products: products,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },

  getProductBySearch: async (req, res) => {
    try {
      const { search, category } = req.params;

      const product = await ProductModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      });
      // if (category) {
      //   // If category is provided, add it to the query
      //   product.category = category;
      // }
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  getProductByPrice: async (req, res) => {
    try {
      const product = await ProductModel.find({
        price: { $gte: req.params.price },
      });
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          status: "Status Success",
          message: "Product found",
          product: product,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  createPayment: async (req, res) => {
    const { products } = req.body;
    console.log("createPaymentInController", products);
    console.log("createPaymentInController", products.cartItems.quantity);
    try {
      // Perform any necessary validation or data processing here
      // const { id, amount, currency, userId, paymentMethod, status } = req.body;
      const userEmail = req?.user?.email;
      console.log("USER EMAIL>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", userEmail);
      const lineItems = products.cartItems.map((product) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        custom_text: {
          shipping_address: {
            message:
              "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
          },
          submit: {
            message: "We'll email you instructions on how to get started.",
          },
        },
        success_url: "http://localhost:3000/successPayment",
        cancel_url: "http://localhost:3000/cancelPayment",
      });

      // Save payment data to your MongoDB using Mongoose
      const { id, amount_total, currency, payment_status } = session;
      const payment = new paymentModel({
        // Map Stripe session data to your schema
        // e.g., session_id, user_id, product details, etc.

        id: id,
        amount: amount_total,
        currency: currency,
        // userId, // Include the user who made the payment
        // paymentMethod:payment_status, // Include the payment method used
        // status, // Include the payment status
        sessionId: session.id, // Map Stripe session ID
        // Add other fields as needed
      });
      await payment.save();
      console.log("SESSSSSSIIIIIOOOOONNNNN", JSON.stringify(session));

      res.status(200).json({ status: 200, id: session.id });
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({ status: 500, error: "Payment failed" });
    }
  },
};

module.exports = ProductsController;
