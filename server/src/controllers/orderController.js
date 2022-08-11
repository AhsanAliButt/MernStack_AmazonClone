const OrderModel = require("../models/order");

const addOrderItem = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (
    !orderItems ||
    !shippingAddress ||
    !paymentMethod ||
    (orderItems && orderItems.length === 0)
  ) {
    return res.status(400).send("Missing required fields Or No order Found");
  } else {
    const newOrderItem = new OrderModel({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const newOrder = await newOrderItem.save();
    return res.status(200).send(newOrder);
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await OrderModel.findById(orderId).populate(
    "user",
    "name email"
  );
  if (!order) {
    return res.status(404).send("Order Not Found");
  } else {
    return res.status(200).send(order);
  }
};

const updateOrderToPaid = async (req, res) => {
  const { orderId } = req.params;
  const order = await OrderModel.findById(orderId);
  if (!order) {
    return res.status(404).send("Order Not Found");
  } else {
    order.paidAt = new Date();
    order.paymentResult.status = "paid";
    order.paymentResult.upload_status = "uploaded";
    order.paymentResult.id = orderId;
    order.paymentResult.emailaddress = req.user.email;
    order.paymentResult.update_time = new Date();
    const updatedOrder = await order.save();
    return res.status(200).send(updatedOrder);
  }
};

const updateOrderToPending = async (req, res) => {
  const { orderId } = req.params;
  const order = await OrderModel.findById(orderId);
  if (!order) {
    return res.status(404).send("Order Not Found");
  } else {
    order.paymentResult.status = "pending";
    order.paymentResult.upload_status = "not uploaded";
    order.paymentResult.id = orderId;
    order.paymentResult.emailaddress = req.user.email;
    order.paymentResult.update_time = new Date();
    const updatedOrder = await order.save();
    return res.status(200).send(updatedOrder);
  }
};

const getMyOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await OrderModel.find({ user: userId });
  if (!orders) {
    return res.status(404).send("No Orders Found");
  } else {
    return res.status(200).send(orders);
  }
};

module.exports = {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  updateOrderToPending,
  getMyOrders,
};
