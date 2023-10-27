const { isValidObjectId } = require("mongoose");
const Cart = require("../models/cart");
const User = require("../models/User");

const CartController = {
  addItemToCart: async (req, res) => {
    try {
      const { userId, itemId, note, quantity, price } = req.body;
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
        message: "Server error",
      });
    }
  },
  getCart: async (req, res) => {
    const { userId, id } = req.body;
    console.log(userId, id);
    let user = await User.exists({ _id: userId });

    if (!userId || !isValidObjectId(userId) || !user)
      return res.status(400).send({ status: 400, message: "Invalid user ID" });

    let cart = await Cart.findOne({ userId: userId });
    if (!cart)
      return res
        .status(404)
        .send({ status: 400, message: "Cart not found for this user" });

    res.status(200).send({ status: 200, cart: cart });
  },
  decreaseQuantity: async (req, res) => {
    // use add product endpoint for increase quantity
    let userId = req.body.userId;
    let user = await User.exists({ _id: userId });
    let productId = req.body.productId;

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
      productItem.quantity -= 1;
      cart.products[itemIndex] = productItem;
      cart = await cart.save();
      return res.status(200).send({ status: true, updatedCart: cart });
    }
    res
      .status(400)
      .send({ status: false, message: "Item does not exist in cart" });
  },
  removeItem: async (req, res) => {
    let userId = req.body.userId;
    let user = await User.exists({ _id: userId });
    let productId = req.body.productId;

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
      cart.products.splice(itemIndex, 1);
      cart = await cart.save();
      return res.status(200).send({ status: true, updatedCart: cart });
    }
    res
      .status(400)
      .send({ status: false, message: "Item does not exist in cart" });
  },
};

module.exports = CartController;
