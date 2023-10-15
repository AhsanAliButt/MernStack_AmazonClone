const ProductModel = require("../models/product");

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
    try {
      const {
        name,
        description,
        stock,
        price,
        category,
        imageUrl,
        company,
        brand,
        keywords,
      } = req.body;

      if (!name || !description || !price || !category || !imageUrl || !stock) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        const product = new ProductModel({
          user: req.user._id,
          name: name.charAt(0).toUpperCase() + string.slice(1),
          description: description.charAt(0).toUpperCase() + string.slice(1),
          price: price,
          category: category.charAt(0).toUpperCase() + string.slice(1),
          imageUrl: imageUrl,
          createdAt: Date.now(),
          stock: stock,
          company: company.charAt(0).toUpperCase() + string.slice(1),
          brand: brand.charAt(0).toUpperCase() + string.slice(1),
          keywords: keywords,
        });
        await product.save();
        res.status(200).json({
          status: "Status Success",
          message: "Product created",
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
  updateProduct: async (req, res) => {
    try {
      const { name, description, price, category, imageUrl } = req.body;
      console.log("NAME", name);
      // update only provided fields
      if (!name || !description || !price || !category || !imageUrl) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
          return res.status(400).json({
            status: "Status Failed",
            message: "Product not found",
          });
        } else {
          product.name = name;
          product.description = description;
          product.price = price;
          product.category = category;
          product.imageUrl = imageUrl;
          await product.save();
          res.status(200).json({
            status: "Status Success",
            message: "Product updated",
            product: product,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Status Failed",
        message: "Server error",
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Product not found",
        });
      } else {
        res.status(200).json({
          deletedProduct: product,
        });
        await product.remove();
        res.status(200).json({
          status: "Status Success",
          message: "Product deleted",
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
  getProductById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
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
      const { search } = req.params;
      const product = await ProductModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
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
};

module.exports = ProductsController;
