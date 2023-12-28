const { isValidObjectId } = require("mongoose");
const Cart = require("../models/cart");
const User = require("../models/User");
const { ObjectId } = require("mongoose").Types;

const CartController = {
  addItemToCart: async (req, res) => {
    try {
      const { userId, itemId, note, quantity, price } = req.body;
      // console.log("CONSOLESSSS", userId, itemId, note, quantity, price);
      let user = await User.exists({ _id: userId });

      if (!userId || !isValidObjectId(userId) || !user)
        return res
          .status(400)
          .send({ status: 400, message: "Invalid user ID" });

      let productId = itemId;
      if (!productId)
        return res
          .status(400)
          .send({ status: 400, message: "Invalid product Id" });

      let cart = await Cart.findOne({ userId: userId });

      if (cart) {
        let itemIndex = cart.products.findIndex(
          (p) => p.productId == productId
        );

        if (itemIndex > -1) {
          let productItem = cart.products[itemIndex];
          productItem.quantity += 1;
          // Calculate the total for the product (quantity * price)
          productItem.total = productItem.quantity * productItem.price;
          cart.products[itemIndex] = productItem;
        } else {
          cart.products.push({
            productId: productId,
            quantity: quantity,
            // Add the price and calculate the total
            price: price,
            total: quantity * price,
          });
        }
        // Calculate the subtotal for the entire cart
        cart.subTotal = cart.products.reduce(
          (total, item) => total + item.total,
          0
        );
        cart = await cart.save();
        return res.status(200).send({ status: 200, updatedCart: cart });
      } else {
        const newCart = await Cart.create({
          userId: userId,
          products: [
            {
              productId: productId,
              quantity: quantity,
              price: price,
              total: quantity * price,
            },
          ],
          note: note,
          subTotal: quantity * price, // Initial subtotal for the entire cart
        });

        res.status(201).send({ status: 201, newCart: newCart });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  getCart: async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    let user = await User.exists({ _id: userId });

    if (!userId || !isValidObjectId(userId) || !user)
      return res.status(400).send({ status: 400, message: "Invalid user ID" });

    let cart = await Cart.findOne({ userId: userId });
    if (!cart)
      return res
        .status(404)
        .send({ status: 400, message: "Cart not found for this user" });
    // Calculate the new subtotal for the entire cart
    cart.subTotal = cart.products.reduce(
      (total, item) => total + item.total,
      0
    );
    res.status(200).send({ status: 200, cart: cart });
  },
  increaseQuantity: async (req, res) => {
    try {
      let userId = req.body.userId;
      let user = await User.exists({ _id: userId });
      let productId = req.body.productId;
      console.log("PRODUCTID", productId, "USERID", userId);

      if (!userId || !isValidObjectId(userId) || !user)
        return res
          .status(400)
          .send({ status: false, message: "Invalid user ID" });

      let cart = await Cart.findOne({ userId: userId });
      if (!cart)
        return res
          .status(404)
          .send({ status: false, message: "Cart not found for this user" });

      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += 1;
        // Calculate the new total for the product (updated quantity * price)
        productItem.total = productItem.quantity * productItem.price;
        cart.products[itemIndex] = productItem;

        // Calculate the new subtotal for the entire cart
        cart.subTotal = cart.products.reduce(
          (total, item) => total + item.total,
          0
        );

        cart = await cart.save();
        return res.status(200).send({ status: true, updatedCart: cart });
      }

      res
        .status(400)
        .send({ status: false, message: "Item does not exist in cart" });
    } catch (error) {
      console.error("Error increasing quantity:", error);
      res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  },
  // decreaseQuantity: async (req, res) => {
  //   // use add product endpoint for increase quantity
  //   let userId = req.body.userId;
  //   let user = await User.exists({ _id: userId });
  //   let productId = req.body.productId;
  //   console.log("PRODUCTID", productId, "USERID", userId);

  //   if (!userId || !isValidObjectId(userId) || !user)
  //     return res.status(400).send({ status: 400, message: "Invalid user ID" });

  //   let cart = await Cart.findOne({ userId: userId });
  //   if (!cart)
  //     return res
  //       .status(404)
  //       .send({ status: 400, message: "Cart not found for this user" });

  //   let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  //   if (itemIndex > -1) {
  //     let productItem = cart.products[itemIndex];
  //     productItem.quantity -= 1;
  //     cart.products[itemIndex] = productItem;
  //     // Calculate the new subtotal for the entire cart
  //     cart.subTotal = cart.products.reduce(
  //       (total, item) => total + item.total,
  //       0
  //     );
  //     cart = await cart.save();
  //     return res.status(200).send({ status: true, updatedCart: cart });
  //   }
  //   res
  //     .status(400)
  //     .send({ status: false, message: "Item does not exist in cart" });
  // },
  decreaseQuantity: async (req, res) => {
    let userId = req.body.userId;
    let user = await User.exists({ _id: userId });
    let productId = req.body.productId;
    console.log("PRODUCTID", productId, "USERID", userId);

    if (!userId || !isValidObjectId(userId) || !user)
      return res.status(400).send({ status: 400, message: "Invalid user ID" });

    let cart = await Cart.findOne({ userId: userId });
    if (!cart)
      return res
        .status(404)
        .send({ status: 400, message: "Cart not found for this user" });

    let itemIndex = cart.products.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      // Decrease quantity
      productItem.quantity -= 1;

      if (productItem.quantity > 0) {
        // If quantity is still greater than 0, update the item
        cart.products[itemIndex] = productItem;
      } else {
        // If quantity is 0 or less, remove the item from the array
        cart.products.splice(itemIndex, 1);
        return res
          .status(200)
          .send({ status: true, deleted: true, updatedCart: cart });
      }

      // Calculate the new subtotal for the entire cart
      cart.subTotal = cart.products.reduce(
        (total, item) => total + item.total,
        0
      );
      cart = await cart.save();
      return res.status(200).send({ status: true, updatedCart: cart });
    }

    res
      .status(400)
      .send({ status: false, message: "Item does not exist in cart" });
  },
  removeItem: async (req, res) => {
    try {
      let userId = req.body.userId;
      let user = await User.exists({ _id: userId });
      let productId = req.body.productId;

      // console.log("PRODUCTID", productId, "USERID", userId);

      if (!userId || !isValidObjectId(userId) || !user)
        return res
          .status(400)
          .send({ status: false, message: "Invalid user ID" });

      let cart = await Cart.findOne({ userId: userId });
      if (!cart)
        return res
          .status(404)
          .send({ status: false, message: "Cart not found for this user" });

      // Convert productId to ObjectId for comparison
      const objectIdProductId = ObjectId(productId);

      let itemIndex = cart.products.findIndex((p) =>
        p.productId.equals(objectIdProductId)
      );
      // console.log("Cart Products:", cart.products);
      // console.log("Product ID to Remove:", productId);
      // console.log("Product ID to Remove INDEX:", itemIndex);

      if (itemIndex > -1) {
        cart.products.splice(itemIndex, 1);
        // Calculate the new subtotal for the entire cart
        cart.subTotal = cart.products.reduce(
          (total, item) => total + item.total,
          0
        );
        cart = await cart.save();
        return res.status(200).send({ status: true, updatedCart: cart });
      }

      res
        .status(400)
        .send({ status: false, message: "Item does not exist in cart" });
    } catch (error) {
      console.error("Error removing item:", error);
      res.status(500).send({ status: false, message: "Internal Server Error" });
    }
  },
};

module.exports = CartController;
